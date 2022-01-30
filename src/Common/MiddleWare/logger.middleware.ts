import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
/**
 * This method is used to return the logger related info based on middleware
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength}-${userAgent}${ip}`
      );
      this.logger.log(
        'info',
        `${method} ${originalUrl} ${statusCode} ${contentLength}-${userAgent}${ip}`
      );
    });
    next();
  }
}
