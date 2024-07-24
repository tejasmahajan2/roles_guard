import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.SuperAdmin)
  // @UseGuards(RolesGuard)
  @Get('dashboard')
  adminDashboard(): string {
    return "Welcome to Admin Dashboard";
  }
}
