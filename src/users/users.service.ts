import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    // TODO: Hash password https://docs.nestjs.com/security/authentication (first warning)
    return await this.usersRepository.save({
      ...createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(username: string) {
    return this.usersRepository.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
    });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
