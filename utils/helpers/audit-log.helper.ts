import { HttpException } from '@nestjs/common';
import { JoiPipeValidationException } from 'nestjs-joi';
import { AuditLogsModel } from 'models/audit-logs.model';

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const SENSITIVE_KEYS = new Set([
  'password',
  'old_password',
  'new_password',
  'token',
  'access_token',
  'code_verify',
]);

const SKIP_PATH_PREFIXES = [
  '/auth/login',
  '/auth/branding',
  '/auth/register',
  '/auth/login/customer',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/send-verify-code',
  '/auth/verify-code',
  '/iclock',
  '/logs',
  '/notifications/pusher/auth',
];

export function sanitizeAuditValue(value: unknown): unknown {
  if (value == null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeAuditValue(item));
  }

  const result: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key)) {
      result[key] = '********';
      continue;
    }

    result[key] = sanitizeAuditValue(val);
  }

  return result;
}

export function shouldSkipAudit(method: string, path: string, user: unknown) {
  if (!MUTATION_METHODS.has(method.toUpperCase())) {
    return true;
  }

  if (!user) {
    return true;
  }

  const normalizedPath = path.split('?')[0] || path;

  return SKIP_PATH_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix));
}

function extractBearerToken(req: any): string | null {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return null;
  }

  return authorization.replace(/^Bearer\s+/i, '') || null;
}

export function buildErrorResponseMessage(
  error: unknown,
): Record<string, unknown> {
  if (error instanceof JoiPipeValidationException) {
    const data: Record<string, string[]> = {};

    for (const err of error.joiValidationError.details) {
      const key = err.context?.key || err.context?.label || '';

      if (!data[key]) {
        data[key] = [];
      }

      data[key].push(err.message?.replace(/"/g, '') ?? '');
    }

    return {
      message: 'Validation Error',
      data,
    };
  }

  if (error instanceof HttpException) {
    const response = error.getResponse();
    const statusCode = error.getStatus();

    if (typeof response === 'object' && response !== null) {
      return { ...(response as Record<string, unknown>), statusCode };
    }

    if (typeof response === 'string') {
      return { message: response, statusCode };
    }

    return { message: 'Unknown error', statusCode };
  }

  return {
    statusCode: 500,
    message: error instanceof Error ? error.message : 'internal server error',
  };
}

export type AuditLogPayload = {
  status: 'success' | 'error';
  response_message?: unknown;
};

export async function recordAuditLog(
  req: any,
  payload: AuditLogPayload,
): Promise<void> {
  if (req._auditLogRecorded) {
    return;
  }

  const method = String(req.method || 'GET').toUpperCase();
  const path = req.originalUrl || req.url || '';
  const user = req.user;

  if (shouldSkipAudit(method, path, user)) {
    return;
  }

  req._auditLogRecorded = true;

  const url = path.split('?')[0];
  const body = sanitizeAuditValue(req.body);
  const token = extractBearerToken(req);

  try {
    await AuditLogsModel.query().insert({
      user_id: user.id,
      token,
      url,
      action: method,
      body: body as any,
      status: payload.status,
      response_message: sanitizeAuditValue(payload.response_message) as any,
    } as any);
  } catch (error) {
    console.error('[recordAuditLog]', error);
  }
}
