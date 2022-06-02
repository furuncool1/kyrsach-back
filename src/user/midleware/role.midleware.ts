import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = await context.switchToHttp().getRequest();
    const user = request.user;

    const inRole = roles.find(el => el == user.role.system_name);

    if (user.role && inRole) {
      return true;
    }

    return false;
  }
}