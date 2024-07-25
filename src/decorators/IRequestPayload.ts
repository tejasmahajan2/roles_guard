import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


export class IRequestPayload extends PartialType(CreateUserDto) {
    username: string;
    role: string;
}
