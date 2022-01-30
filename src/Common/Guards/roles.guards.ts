import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GlobalAccess } from '../Access/global.access';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (roles.includes('admin') && GlobalAccess.role === 'admin') {
      return true;
    }
    if (roles.includes('user') && GlobalAccess.role === 'user') {
      return true;
    }
    return false;
  }
}
