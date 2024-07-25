import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { Role } from 'src/roles/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('admin/register')
  signUpAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.SuperAdmin;
    return this.authService.signUp(createUserDto);
  }

  @Post('org/register')
  signUpOrganization(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.Organization;
    return this.authService.signUp(createUserDto);
  }

  @Post('register')
  signUpDoctor(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.Doctor;
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(@Req() req: Request) {
    return this.authService.deleteUser(req['user'].id);
  }

  // Delete all users
  @UseGuards(AuthGuard)
  @Delete('delete-all')
  deleteAllUser(@Req() req: Request) {
    return this.authService.deleteAllUser();
  }
}