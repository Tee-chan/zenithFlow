import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];
    console.log('Incoming Tenant:', tenantId);

    if (!tenantId) {
      throw new BadRequestException('X-Tenant-Id header is missing. Access denied.');
    }

    // For now, we attach it to the request object. 
    // Next week, we move this to AsyncLocalStorage!
    req['tenantId'] = tenantId;
    next();
  }
}
