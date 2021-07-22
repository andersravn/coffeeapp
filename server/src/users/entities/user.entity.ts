import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Coffee } from '../../coffees/entities/coffee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: 'changeme' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Coffee, (coffee) => coffee.user)
  coffees: Coffee[];
}
