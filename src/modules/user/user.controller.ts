import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';
import { FindUsersDto } from './dto/find-users.dto';
import { UserNotFound } from './errors/user-errors';

@ApiExcludeController()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() findUsersDto: FindUsersDto) {
    const results = await this.userService.findAll(findUsersDto);
    return results;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findByUsername(id);
    if (!user) throw new UserNotFound();

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(id, updateUserDto);
    if (!result) throw new UserNotFound();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.userService.remove(id);
    if (!result) throw new UserNotFound();
  }
}
