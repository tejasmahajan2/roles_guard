import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/roles.guard';
import { IExpressRequest } from './decorators/IExpressRequest';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Organization)
  @Get('dashboard')
  async adminDashboard(@Req() req: IExpressRequest) : Promise<User[]> {
    const user = req.user;
    const userRole = user?.role;
    const isSuperAdmin = userRole === Role.SuperAdmin;
    const filterRole = isSuperAdmin ? Role.Organization : Role.Doctor;
    return await this.userService.filter(filterRole);
  }
}
