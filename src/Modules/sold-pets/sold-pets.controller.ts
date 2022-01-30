import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SoldPetsService } from './sold-pets.service';
import { SoldPets } from './../../Entities/sold.pets.entity';
import { Request } from 'express';
import { Roles } from 'src/Common/Decorators/roles.decorator';
import { RolesGuards } from './../../Common/Guards/roles.guards';
import { GlobalAccess } from 'src/Common/Access/global.access';

@ApiTags('sold pets info')
@UseGuards(RolesGuards)
@Controller('sold-pets')
export class SoldPetsController {
  constructor(private readonly soldPetsService: SoldPetsService) {}

  @Post('buyPets')
  @Roles('user')
  async soldPet(@Body() data: SoldPets, @Req() request: Request) {
    console.log(GlobalAccess.role);

    return await this.soldPetsService.soldPets(data, request);
  }
}
