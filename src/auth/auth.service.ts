import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(signInDto.username);

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
    const username = createUserDto.username;
    if (await this.usersService.isExist(username)) {
      throw new BadRequestException('User already exist.');
    };

    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.usersService.create(createUserDto);
  }

  async updateOne(username: string, updateUserDto: UpdateUserDto,) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    return await this.usersService.updateOne(username, updateUserDto);
  }

  // Development
  async deleteOne(id: string) {
    return await this.usersService.deleteOne(id);
  }

  async deleteAll() {
    return await this.usersService.deleteAll();
  }
}