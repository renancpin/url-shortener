import { ApiHideProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import {
  IPaginationQuery,
  PaginationDto,
} from 'src/shared/validators/pagination.dto';

export type UrlPaginationQuery = IPaginationQuery & {
  where?: { userId?: string };
};

export class FindUrlsDto extends PaginationDto {
  @ApiHideProperty()
  @Allow()
  userId?: string;

  toQuery(): UrlPaginationQuery {
    return {
      ...super.toQuery(),
      where: this.userId ? { userId: this.userId } : undefined,
    };
  }
}
