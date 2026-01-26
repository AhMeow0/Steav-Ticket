import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.user) {
      throw new ForbiddenException('Not logged in');
    }

    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
