import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  // Added Later
  @HttpCode(HttpStatus.OK)
  @Post('admin/register')
  signUpAdmin(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.SuperAdmin;
    return this.authService.signUp(createUserDto);
  }

  // Added Later
  @HttpCode(HttpStatus.OK)
  @Post('organization/register')
  signUpOrganization(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.Organization;
    return this.authService.signUp(createUserDto);
  }

  // Added Later
  @HttpCode(HttpStatus.OK)
  @Post('doctor/register')
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