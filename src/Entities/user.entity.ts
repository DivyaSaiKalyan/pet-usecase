import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Maintenance } from './maintenance.entity';
import { SoldPets } from './sold.pets.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

/**
 * This is a user entity class all user related info is avaliable here
 */
@Entity()
export class User extends Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column({ unique: true })
  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @BeforeInsert()
  async strongPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => SoldPets, (soldPets) => soldPets.user, { cascade: true })
  soldPets: SoldPets[];

  addSoldPets(soldPets: SoldPets) {
    if (this.soldPets == null) {
      this.soldPets = new Array<SoldPets>();
    }
    return this.soldPets.push(soldPets);
  }
}
