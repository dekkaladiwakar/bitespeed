// always-false.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AlwaysBlockGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return false;
  }
}
