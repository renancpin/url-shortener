import { applyDecorators } from '@nestjs/common';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  ValidationOptions,
} from 'class-validator';
import { passwordRegex } from './password-regex';

export function IsPositiveInteger(props?: ValidationOptions) {
  return applyDecorators(IsPositive(props), IsInt(props));
}

export function IsValidPassword(
  props?: ValidationOptions & { length?: number },
) {
  const minLength = props?.length ?? 8;
  return applyDecorators(
    Matches(passwordRegex, {
      ...props,
      message: `Password must be at least ${minLength} characters long and include a letter and a number`,
    }),
    IsString(),
    IsNotEmpty(),
  );
}
