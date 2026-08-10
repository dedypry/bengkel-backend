import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiPipeValidationException } from 'nestjs-joi';
import { UniqueViolationError } from 'objection';
import { recordAuditLog } from 'utils/helpers/audit-log.helper';

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    console.error('EXCEPTION', exception, status);

    if (exception instanceof JoiPipeValidationException) {
      const errorDdata: Record<string, string[]> = {};

      for (const err of exception.joiValidationError.details) {
        const key = err.context?.key || err.context?.label || '';
        if (!errorDdata[key]) {
          errorDdata[key] = [];
        }
        errorDdata[key].push(err.message?.replace(/"/g, ''));
      }

      const body = {
        message: 'Validation Error',
        data: errorDdata,
      };

      void recordAuditLog(req, {
        status: 'error',
        response_message: body,
      });

      return res.status(402).json(body);
    }

    if (exception instanceof UniqueViolationError) {
      const column = exception.columns.join(', ').replaceAll('_', ' ');
      const message = `Data dengan ${column}  tersebut sudah terdaftar di sistem.`;
      const body = {
        statusCode: 409,
        error: 'Conflict',
        message: message,
      };

      void recordAuditLog(req, {
        status: 'error',
        response_message: body,
      });

      return res.status(409).json(body);
    }

    const body = {
      message: status == 500 ? 'internal server error' : exception.message,
      ...(exception instanceof HttpException
        ? { statusCode: status }
        : { statusCode: status }),
    };

    void recordAuditLog(req, {
      status: 'error',
      response_message: {
        status,
        response: body,
      },
    });

    res.status(status).json(body);
  }
}
