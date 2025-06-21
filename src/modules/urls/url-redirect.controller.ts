import {
  Controller,
  Get,
  Param,
  HttpRedirectResponse,
  HttpStatus,
  NotFoundException,
  Redirect,
  Logger,
} from '@nestjs/common';
import { UrlRedirectService } from './url-redirect.service';

@Controller('/')
export class UrlRedirectController {
  constructor(private readonly urlRedirectService: UrlRedirectService) {}

  private logger = new Logger('UrlRedirectService');

  @Get(':key/')
  @Redirect()
  async redirectShortUrl(
    @Param('key') key: string,
  ): Promise<HttpRedirectResponse> {
    const longUrl = await this.urlRedirectService.getLongUrl(key);
    if (!longUrl) {
      this.logger.warn(`Someone tried to access missing url: ${key}`);
      throw new NotFoundException("There's nothing here!");
    }

    const redirect: HttpRedirectResponse = {
      url: longUrl,
      statusCode: HttpStatus.FOUND,
    };

    return redirect;
  }
}
