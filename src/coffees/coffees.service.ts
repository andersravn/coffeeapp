import { Injectable, Logger } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private coffeesRepository: Repository<Coffee>,
  ) {}

  create(createCoffeeDto: CreateCoffeeDto, userId: number) {
    Logger.log(createCoffeeDto);
    return this.coffeesRepository.save({
      user: { id: userId },
      name: createCoffeeDto.name,
    });
  }

  findAll(userId: number) {
    return this.coffeesRepository.find({ where: `user.id == ${userId}` });
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
