import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/sign-in.dto';
import { Role } from 'src/roles/role.enum';
import { IExpressRequest } from 'src/decorators/IExpressRequest';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

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

  // Developement Purpose
  @Patch('change-password')
  @UseGuards(AuthGuard)
  updatePassword(@Req() req: IExpressRequest, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.authService.updateOne(req['user'].id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteUser(@Req() req: IExpressRequest) {
    return this.authService.deleteOne(req['user'].id);
  }

  @Delete('delete-all')
  @UseGuards(AuthGuard)
  deleteAllUser() {
    return this.authService.deleteAll();
  }
}