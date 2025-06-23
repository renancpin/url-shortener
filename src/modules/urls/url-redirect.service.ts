import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';

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
