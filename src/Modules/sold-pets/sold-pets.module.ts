import { Module } from '@nestjs/common';
import { SoldPetsService } from './sold-pets.service';
import { SoldPetsController } from './sold-pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldPets } from './../../Entities/sold.pets.entity';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';
import { PetsService } from './../pets/pets.service';
import { UserService } from './../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { Pets } from './../../Entities/pets.entity';
import { User } from './../../Entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SoldPets, Pets, User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3h' }
    })
  ],

  providers: [SoldPetsService, jwtServiceClass, PetsService, UserService],
  controllers: [SoldPetsController]
})
export class SoldPetsModule {}
