import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto.username);

    if (!user) {
      throw new NotFoundException();
    }

    if (!await bcrypt.compare(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return {
      access_token: await this.jwtService.signAsync(result),
    };
  }

  async signUp(
    createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  async deleteUser(
    username: string,
  ) {
    return await this.usersService.deleteOne(username);
  }
}