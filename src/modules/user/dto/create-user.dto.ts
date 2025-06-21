import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from 'src/shared/validators/validation-decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsValidPassword({ length: 8 })
  password: string;
}
