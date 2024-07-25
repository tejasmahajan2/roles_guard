import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username: username });
  }


  async filter(role: string): Promise<User[]> {
    return this.usersRepository.createQueryBuilder('i')
      .select(["i.name", "i.id"])
      .where("i.role = role", { role: role })
      .getMany();
  }

  async deleteOne(id: string) {
    const result = await this.usersRepository.delete(id);
    return result;
  }

  async deleteAll() {
    const result = await this.usersRepository.delete({});
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const username = createUserDto.username;
    const isUserExist = await this.usersRepository.exists({
      where: { username }
    });
    if (isUserExist) {
      throw new BadRequestException('User already exist.');
    };

    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    const user = await this.usersRepository.save(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}