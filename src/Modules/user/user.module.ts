import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../../Entities/user.entity';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';
import { JwtModule } from '@nestjs/jwt';

/**
 * This is user module all user related configurations are avaliable here
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3h' }
    })
  ],

  controllers: [UserController],
  providers: [UserService, jwtServiceClass]
})
export class UserModule {}
