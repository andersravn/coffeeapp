import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private coffeesRepository: Repository<Coffee>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto, userId: number) {
    const user = await this.usersRepository.findOne(userId);

    return this.coffeesRepository.save({
      name: createCoffeeDto.name,
      user: user,
    });
  }

  async findAll(userId: number) {
    const user = await this.usersRepository.findOne(userId);
    if (user) {
      return this.coffeesRepository.find({ relations: ['user'] });
    }
  }

  findOne(id: number) {
    return this.coffeesRepository.findOne(id);
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesRepository.update(id, {
      user: { id: 0 },
      name: updateCoffeeDto.name,
    });
  }

  remove(id: number) {
    return this.coffeesRepository.delete(id);
  }
}
