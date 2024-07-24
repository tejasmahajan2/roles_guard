import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class SignInDto extends PartialType(CreateUserDto) {
    username: string;
    password: string;
}
