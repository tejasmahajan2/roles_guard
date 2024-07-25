import { Injectable, Req } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Request } from 'express';
import { IExpressRequest } from './decorators/IExpressRequest';
import { User } from './users/entities/user.entity';
import { Role } from './roles/role.enum';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UsersService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getAll(@Req() req: IExpressRequest): Promise<User[] | null> {
    const user = req.user;
    const userRole = user?.role;
    const isSuperAdmin = userRole === Role.SuperAdmin;
    const filterRole = isSuperAdmin ? Role.Organization : Role.Doctor;
    return await this.userService.filter(filterRole);
  }
}
