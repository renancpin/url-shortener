import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class UrlNotFound extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'Url not found');
  }
}

export class UrlAlreadyExists extends UnprocessableEntityException {
  constructor(message?: string) {
    super(message ?? 'Url key already exists');
  }
}
