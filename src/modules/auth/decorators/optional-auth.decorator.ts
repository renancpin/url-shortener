import { SetMetadata } from '@nestjs/common';

export const OPTIONAL_AUTH = Symbol.for('OPTIONAL_AUTH');

export function OptionalAuth() {
  return SetMetadata(OPTIONAL_AUTH, true);
}
