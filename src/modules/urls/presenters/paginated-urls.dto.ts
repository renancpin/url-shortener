import { Type } from 'class-transformer';
import {
  PaginatedResults,
  PaginatedResultsProps,
} from 'src/shared/transformers/paginated-results.serializer';
import { UrlPresenter } from './url-presenter.dto';

export class PaginatedUrls extends PaginatedResults<UrlPresenter> {
  constructor(props: PaginatedResultsProps<UrlPresenter>) {
    super(props);
    this.data = props.data;
  }

  @Type(() => UrlPresenter)
  data: UrlPresenter[];
}
