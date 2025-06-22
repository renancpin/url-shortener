import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { FindUrlsDto } from './dto/find-urls.dto';
import { UrlNotFound } from './errors/url-errors';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OptionalAuth } from '../auth/decorators/optional-auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { LoggedUser } from '../auth/types/logged-user.type';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @OptionalAuth()
  @Post()
  async create(@Body() createUrlDto: CreateUrlDto, @User() user?: LoggedUser) {
    const url = await this.urlsService.create({
      ...createUrlDto,
      userId: user?.id,
    });
    return url;
  }

  @Get()
  async findAll(@Query() query: FindUrlsDto, @User() user: LoggedUser) {
    query.userId = user.id;
    const urls = await this.urlsService.findAll(query);
    return urls;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: LoggedUser) {
    const url = await this.urlsService.findOne(id, user.id);
    if (!url) throw new UrlNotFound();
    return url;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto,
    @User() user: LoggedUser,
  ) {
    const result = await this.urlsService.update(
      { id, userId: user.id },
      updateUrlDto,
    );
    if (!result) throw new UrlNotFound();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: LoggedUser) {
    const result = await this.urlsService.remove(id, user.id);
    if (!result) throw new UrlNotFound();
  }
}
