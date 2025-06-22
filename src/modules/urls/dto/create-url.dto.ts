import { ApiHideProperty } from '@nestjs/swagger';
import { Allow, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  longUrl: string;

  @ApiHideProperty()
  @Allow()
  userId?: string;
}
