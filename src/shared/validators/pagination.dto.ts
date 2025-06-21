import { Type } from 'class-transformer';
import { IsPositiveInteger } from './validation-decorators';

export interface IPaginationProps {
  page: number;
  results: number;
}

export interface IPaginationQuery {
  skip?: number;
  take?: number;
}

export class PaginationDto implements IPaginationProps {
  constructor(props?: Partial<IPaginationProps>) {
    const { page, results } = props ?? {};
    if (page) this.page = page;
    if (results) this.results = results;
  }

  @IsPositiveInteger()
  @Type(() => Number)
  page: number = 1;

  @IsPositiveInteger()
  @Type(() => Number)
  results: number = 50;

  toQuery(): IPaginationQuery {
    return {
      take: this.results,
      skip: (this.page - 1) * this.results,
    };
  }
}
