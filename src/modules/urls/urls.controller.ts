import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { FindUrlsDto } from './dto/find-urls.dto';
import { UrlNotFound } from './errors/url-errors';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlsService.create(createUrlDto);
    return url;
  }

  @Get()
  async findAll(@Query() query: FindUrlsDto) {
    const urls = await this.urlsService.findAll(query);
    return urls;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const url = await this.urlsService.findOne(id);
    if (!url) throw new UrlNotFound();
    return url;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    const result = await this.urlsService.update(id, updateUrlDto);
    if (!result) throw new UrlNotFound();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.urlsService.remove(id);
    if (!result) throw new UrlNotFound();
  }
}
