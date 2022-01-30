import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './Config/TypeOrm/typeorm.config';
import { UserModule } from './Modules/user/user.module';
import { PetsModule } from './Modules/pets/pets.module';
import { SoldPetsModule } from './Modules/sold-pets/sold-pets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: TypeOrmConfig.host,
      port: TypeOrmConfig.port,
      username: TypeOrmConfig.username,
      password: TypeOrmConfig.password,
      database: TypeOrmConfig.database,
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    PetsModule,
    SoldPetsModule
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
