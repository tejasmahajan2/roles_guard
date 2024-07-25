import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(id: any): Promise<User | null> {
    return await this.usersRepository.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  async isExist(username: string): Promise<Boolean> {
    return await this.usersRepository.exists({
      where: { username }
    });
  }

  async updateOne(username: string, updateUserDto: UpdateUserDto): Promise<String> {
    const result = await this.usersRepository.update({ username }, { ...updateUserDto });
    return 'Password updated successfully.';
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async filter(role: string): Promise<User[]> {
    return await this.usersRepository.createQueryBuilder('i')
      .select(["i.name", "i.id"])
      .where("i.role = role", { role: role })
      .getMany();
  }

  // Development
  async deleteOne(id: string) {
    return await this.usersRepository.delete(id);
  }

  async deleteAll() {
    return await this.usersRepository.delete({});
  }
}