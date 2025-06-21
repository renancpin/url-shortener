import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class SearchDate {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  from?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  to?: Date;
}

export class SearchNumber {
  @IsNumber()
  @IsOptional()
  from?: number;

  @IsNumber()
  @IsOptional()
  to?: number;
}
