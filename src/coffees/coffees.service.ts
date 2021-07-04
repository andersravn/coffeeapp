import { Injectable, Logger } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

const coffees: Coffee[] = [];

@Injectable()
export class CoffeesService {
  create(createCoffeeDto: CreateCoffeeDto) {
    Logger.log(createCoffeeDto);
    const newCoffee: Coffee = { name: createCoffeeDto.name };
    coffees.push(newCoffee);
    return newCoffee;
  }

  findAll() {
    return coffees;
  }

  findOne(id: number) {
    return coffees[id];
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    let coffee = coffees[id];
    coffee = { ...coffee, ...updateCoffeeDto };
    coffees[id] = coffee;
    return coffee;
  }

  remove(id: number) {
    return coffees.splice(id, 1);
  }
}
