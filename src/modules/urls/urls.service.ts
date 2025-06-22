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
export class UrlsService {
  constructor(
    @InjectRepository(Url) private urlRepository: Repository<Url>,
    private configService: ConfigService<EnvironmentVariables>,
  ) {
    this.HOST_URL = this.configService.get('HOST_URL', 'http://localhost:3000');
    this.SHORT_URL_LENGTH = this.configService.get('SHORT_URL_LENGTH', 6);
  }

  private HOST_URL: string;
  private SHORT_URL_LENGTH: number;

  async create(createUrlDto: CreateUrlDto): Promise<UrlPresenter> {
    const key = generateRandomString(this.SHORT_URL_LENGTH);
    const keyAlreadyExists = await this.urlRepository.exists({
      where: { key },
    });
    if (keyAlreadyExists) throw new UrlAlreadyExists();

    const url = this.urlRepository.create({
      key,
      longUrl: createUrlDto.longUrl,
      userId: createUrlDto.userId,
    });

    await this.urlRepository.save(url);

    return this.toUrlPresenter(url);
  }

  async findAll(queryDto: FindUrlsDto): Promise<PaginatedUrls> {
    const query = queryDto.toQuery();
    const [urls, total] = await this.urlRepository.findAndCount({
      skip: query.skip,
      take: query.take,
      where: query.where,
      relations: ['user'],
    });
    const response = new PaginatedUrls({
      data: urls.map((url) => this.toUrlPresenter(url)),
      page: queryDto.page,
      results: queryDto.results,
      totalResults: total,
    });
    return response;
  }

  async findOne(id: string, userId: string): Promise<UrlPresenter | null> {
    const url = await this.urlRepository.findOne({
      where: { id, userId },
      relations: ['user'],
    });
    if (!url) return null;
    return this.toUrlPresenter(url);
  }

  async update(
    filter: { id: string; userId: string },
    updateUrlDto: UpdateUrlDto,
  ): Promise<boolean> {
    const result = await this.urlRepository.update(
      { id: filter.id, userId: filter.userId },
      {
        longUrl: updateUrlDto.longUrl,
      },
    );
    if (!result.affected) return false;

    return true;
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.urlRepository.softDelete({
      id,
      userId,
    });
    if (!result.affected) return false;

    return true;
  }

  private getShortUrl(key: string): string {
    const url = new URL(key, this.HOST_URL);
    return url.href;
  }

  private toUrlPresenter(url: Url) {
    return new UrlPresenter({ ...url, shortUrl: this.getShortUrl(url.key) });
  }
}
