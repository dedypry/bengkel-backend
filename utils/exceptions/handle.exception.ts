import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiPipeValidationException } from 'nestjs-joi';

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (exception instanceof JoiPipeValidationException) {
      const errorDdata: Record<string, string[]> = {};

      for (const err of exception.joiValidationError.details) {
        const key = err.context?.key || err.context?.label || '';
        if (!errorDdata[key]) {
          errorDdata[key] = [];
        }
        errorDdata[key].push(err.message?.replace(/"/g, ''));
      }

      return res.status(402).json({
        message: 'Validation Error',
        data: errorDdata,
      });
    }

    console.error('EXCEPTION', exception.message, status);

    res.status(status).json({
      message: status == 500 ? 'internal server error' : exception.message,
    });
  }
}
