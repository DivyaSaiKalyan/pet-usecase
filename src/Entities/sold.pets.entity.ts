import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SoldPets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  petName: string;

  @Column()
  petCost: number;

  @Column()
  @ApiProperty()
  sellerName: string;

  @Column()
  @ApiProperty()
  buyerName: string;

  @Column({ default: new Date().toLocaleDateString() })
  buyDate: string;

  @ManyToOne(() => User, (user) => user.soldPets)
  user: User;
}
