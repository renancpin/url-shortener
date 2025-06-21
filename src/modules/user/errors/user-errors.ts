import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'User not found');
  }
}
