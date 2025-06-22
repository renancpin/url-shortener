import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { FindUrlsDto } from './dto/find-urls.dto';
import { PaginatedUrls } from './presenters/paginated-urls.dto';
import { UrlPresenter } from './presenters/url-presenter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/env.validation';
import { generateRandomString } from 'src/shared/utils/generate-random.function';
import { UrlAlreadyExists } from './errors/url-errors';

@Injectable()
export class UrlRedirectService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  async getLongUrl(key: string): Promise<string | null> {
    const url = await this.urlRepository.findOne({
      where: { key },
      select: { longUrl: true },
    });
    if (!url) return null;

    await this.urlRepository.increment({ key }, 'visits', 1);

    return url.longUrl;
  }
}
