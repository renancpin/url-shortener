import { Url } from '../entities/url.entity';

export type UrlPresenterProps = Pick<
  Url,
  'id' | 'longUrl' | 'visits' | 'createdAt' | 'updatedAt'
> & { shortUrl: string };

export class UrlPresenter implements UrlPresenterProps {
  id: string;
  shortUrl: string;
  longUrl: string;
  visits: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    shortUrl,
    longUrl,
    visits,
    createdAt,
    updatedAt,
  }: UrlPresenterProps) {
    Object.assign(this, {
      id,
      shortUrl,
      longUrl,
      visits,
      createdAt,
      updatedAt,
    });
  }
}
