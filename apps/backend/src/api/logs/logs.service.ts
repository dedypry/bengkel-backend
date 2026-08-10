import { ForbiddenException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PersonalAccessTokenModel } from 'models/personal-access-token.model';
import { AuditLogsModel } from 'models/audit-logs.model';
import { UsersModel } from 'models/users.model';
import { IAuth } from 'utils/interfaces/IAuth';
import { LogsQueryDto } from './dto/logs.dto';

type DateRange = {
  startAt: string;
  endAt: string;
} | null;

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class LogsService {
  private normalizeAuditAction(action?: string | null) {
    if (!action) {
      return action ?? null;
    }

    const method = action.split(' ')[0]?.toUpperCase();

    return MUTATION_METHODS.has(method) ? method : action;
  }

  private async assertSuperAdmin(auth: IAuth) {
    const user = await UsersModel.query()
      .withGraphFetched('roles')
      .findById(auth.id);

    if (!user) {
      throw new ForbiddenException('Akses ditolak');
    }

    const roleSlugs = user.roles?.map((role) => role.slug) ?? [];

    if (!roleSlugs.includes('super-admin')) {
      throw new ForbiddenException(
        'Hanya super-admin yang dapat mengakses logs',
      );
    }
  }

  private resolveDateRange(query: LogsQueryDto): DateRange {
    const hasStart = Boolean(query.start_at?.trim());
    const hasEnd = Boolean(query.end_at?.trim());

    if (!hasStart && !hasEnd) {
      return null;
    }

    const endAt = hasEnd
      ? dayjs(query.end_at).format('YYYY-MM-DD HH:mm:ss')
      : dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');

    const startAt = hasStart
      ? dayjs(query.start_at).format('YYYY-MM-DD HH:mm:ss')
      : dayjs(endAt)
          .subtract(7, 'day')
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');

    return { startAt, endAt };
  }

  private resolveSessionStatus(session: PersonalAccessTokenModel) {
    if (session.deleted_at) {
      return 'revoked';
    }

    if (dayjs(session.exp_at).isBefore(dayjs())) {
      return 'expired';
    }

    return 'active';
  }

  async listLoginSessions(query: LogsQueryDto, auth: IAuth) {
    await this.assertSuperAdmin(auth);

    const range = this.resolveDateRange(query);
    const page = query.page ?? 0;
    const pageSize = query.pageSize ?? 10;

    const data = await PersonalAccessTokenModel.queryWithDeleted()
      .alias('pat')
      .select(
        'pat.id',
        'pat.user_id',
        'pat.device_label',
        'pat.platform',
        'pat.browser',
        'pat.ip_address',
        'pat.created_at',
        'pat.updated_at',
        'pat.last_used_at',
        'pat.deleted_at',
        'pat.exp_at',
        'users.name as user_name',
        'users.email as user_email',
      )
      .leftJoin('users', 'users.id', 'pat.user_id')
      .modify((builder) => {
        if (range) {
          builder.whereBetween('pat.created_at', [range.startAt, range.endAt]);
        }

        if (query.search) {
          builder.where((sub) => {
            sub
              .whereILike('users.name', `%${query.search}%`)
              .orWhereILike('users.email', `%${query.search}%`)
              .orWhereILike('pat.device_label', `%${query.search}%`)
              .orWhereILike('pat.browser', `%${query.search}%`)
              .orWhereILike('pat.ip_address', `%${query.search}%`);
          });
        }
      })
      .orderBy('pat.created_at', 'desc')
      .page(page, pageSize);

    const results = data.results.map((session: any) => ({
      id: session.id,
      user: {
        id: session.user_id,
        name: session.user_name,
        email: session.user_email,
      },
      device_label: session.device_label || 'Perangkat tidak diketahui',
      platform: session.platform || 'desktop',
      browser: session.browser || '-',
      ip_address: session.ip_address || '-',
      created_at: session.created_at,
      last_used_at: session.last_used_at || session.updated_at,
      deleted_at: session.deleted_at,
      exp_at: session.exp_at,
      status: this.resolveSessionStatus(session),
    }));

    return {
      results,
      total: data.total,
    };
  }

  async listActivities(query: LogsQueryDto, auth: IAuth) {
    await this.assertSuperAdmin(auth);

    const range = this.resolveDateRange(query);
    const page = query.page ?? 0;
    const pageSize = query.pageSize ?? 10;

    const data = await AuditLogsModel.query()
      .alias('al')
      .select(
        'al.id',
        'al.user_id',
        'al.url',
        'al.action',
        'al.body',
        'al.status',
        'al.response_message',
        'al.created_at',
        'users.name as user_name',
        'users.email as user_email',
        'pat.id as session_id',
        'pat.device_label as session_device_label',
        'pat.platform as session_platform',
        'pat.browser as session_browser',
        'pat.ip_address as session_ip_address',
      )
      .leftJoin('users', 'users.id', 'al.user_id')
      .leftJoin('personal_access_token as pat', 'pat.token', 'al.token')
      .modify((builder) => {
        if (range) {
          builder.whereBetween('al.created_at', [range.startAt, range.endAt]);
        }

        if (query.search) {
          builder.where((sub) => {
            sub
              .whereILike('users.name', `%${query.search}%`)
              .orWhereILike('users.email', `%${query.search}%`)
              .orWhereILike('al.url', `%${query.search}%`)
              .orWhereILike('al.action', `%${query.search}%`);
          });
        }

        if (query.action) {
          builder.where((sub) => {
            sub
              .where('al.action', query.action)
              .orWhere('al.action', 'like', `${query.action} %`);
          });
        }

        if (query.url) {
          builder.where('al.url', query.url);
        }

        if (query.status) {
          builder.where('al.status', query.status);
        }
      })
      .orderBy('al.created_at', 'desc')
      .page(page, pageSize);

    const results = data.results.map((row: any) => ({
      id: row.id,
      user: {
        id: row.user_id,
        name: row.user_name,
        email: row.user_email,
      },
      url: row.url,
      action: this.normalizeAuditAction(row.action),
      body: row.body,
      status: row.status,
      response_message: row.response_message,
      session: row.session_id
        ? {
            id: row.session_id,
            device_label:
              row.session_device_label || 'Perangkat tidak diketahui',
            platform: row.session_platform || 'desktop',
            browser: row.session_browser || '-',
            ip_address: row.session_ip_address || '-',
          }
        : null,
      created_at: row.created_at,
    }));

    return {
      results,
      total: data.total,
    };
  }

  async getActivityFilterOptions(auth: IAuth) {
    await this.assertSuperAdmin(auth);

    const [actionRows, urlRows, statusRows] = await Promise.all([
      AuditLogsModel.query()
        .distinct('action')
        .select('action')
        .whereNotNull('action')
        .where('action', '!=', '')
        .orderBy('action', 'asc'),
      AuditLogsModel.query()
        .distinct('url')
        .select('url')
        .whereNotNull('url')
        .where('url', '!=', '')
        .orderBy('url', 'asc'),
      AuditLogsModel.query()
        .distinct('status')
        .select('status')
        .whereNotNull('status')
        .where('status', '!=', '')
        .orderBy('status', 'asc'),
    ]);

    const actions = [
      ...new Set(
        actionRows
          .map((row) => this.normalizeAuditAction(row.action as string))
          .filter((action): action is string => Boolean(action)),
      ),
    ].sort();

    return {
      actions,
      urls: urlRows.map((row) => row.url as string),
      statuses: statusRows.map((row) => row.status as string),
    };
  }
}
