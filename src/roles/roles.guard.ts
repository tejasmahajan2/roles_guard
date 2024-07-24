import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    console.log("after requiredRoles", requiredRoles);
    console.log('Checking context : ', context.switchToHttp().getRequest().user || 'No User');
    const request = context.switchToHttp().getRequest();
    const user = request?.user; // Retrieve user from request

    console.log('Request user in roles guard:', user);
    console.log('Required roles:', requiredRoles);


    if (!user || !user.roles) {
      return false; // No user or roles, deny access
    }

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
