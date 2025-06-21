import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/validators/pagination.dto';
import { SearchDate, SearchNumber } from 'src/shared/validators/search.dto';

export class FindUrlsDto extends PaginationDto {
  @Type(() => SearchNumber)
  @IsOptional()
  visits?: number;

  @Type(() => SearchDate)
  @IsOptional()
  createdAt?: SearchDate;

  @Type(() => SearchDate)
  @IsOptional()
  updatedAt?: SearchDate;
}
