import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Maintenance } from './maintenance.entity';

@Entity()
export class Pets extends Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  petName: string;

  @Column()
  @ApiProperty()
  petAge: string;

  @Column()
  @ApiProperty()
  petCost: number;

  @Column({ default: 'Avaliable' })
  status: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  sellerName: string;
}
