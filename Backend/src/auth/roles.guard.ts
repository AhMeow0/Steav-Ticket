import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required (public), let them pass
    if (!requiredRoles) {
      return true;
    }

    // Get the user from the request (attached by AuthGuard)
    const request = context.switchToHttp().getRequest<{ user?: JwtPayload }>();

    const user = request.user;

    // Check if the user has the required role
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
