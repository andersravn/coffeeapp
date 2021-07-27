import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  producer: string;

  @Column({ nullable: true })
  varieties: string;

  @Column({ nullable: true })
  altitude: string;

  @Column({ nullable: true })
  process: string;

  @ManyToOne(() => User, (user) => user.coffees)
  user: User;
}
