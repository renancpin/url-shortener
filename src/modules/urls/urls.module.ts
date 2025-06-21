import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { UrlRedirectService } from './url-redirect.service';
import { UrlRedirectController } from './url-redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ConfigModule],
  controllers: [UrlsController, UrlRedirectController],
  providers: [UrlsService, UrlRedirectService],
})
export class UrlsModule {}
