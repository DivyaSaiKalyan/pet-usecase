import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './../../Entities/pets.entity';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';
import { UserService } from './../user/user.service';
import { User } from './../../Entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pets, User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3h' }
    })
  ],

  controllers: [PetsController],
  providers: [PetsService, jwtServiceClass, UserService]
})
export class PetsModule {}
