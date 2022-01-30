import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pets } from './../../Entities/pets.entity';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuards } from './../../Common/Guards/roles.guards';
import { Roles } from './../../Common/Decorators/roles.decorator';

@ApiTags('pets info')
@UseGuards(RolesGuards)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('addPets')
  @Roles('admin')
  async addPets(@Body() data: Pets, @Req() request: Request) {
    return this.petsService.addPets(data, request);
  }

  @Get('allPets')
  async getAllPets() {
    return await this.petsService.getPets();
  }
}
