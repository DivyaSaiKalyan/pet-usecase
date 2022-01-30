import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getManager, Repository } from 'typeorm';
import { SoldPets } from './../../Entities/sold.pets.entity';
import { PetsService } from './../pets/pets.service';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';
import { UserService } from './../user/user.service';

@Injectable()
export class SoldPetsService {
  constructor(
    @InjectRepository(SoldPets)
    private readonly soldPetsRepository: Repository<SoldPets>,
    private readonly petsService: PetsService,
    private readonly jwtserviceClass: jwtServiceClass,
    private readonly userService: UserService
  ) {}

  /**
   * This method is used to create a sold api to the client
   * @param data
   * @param request
   */
  async soldPets(data: SoldPets, request: Request) {
    const token = request.cookies['jwt'];
    const tokenData = await this.jwtserviceClass.verifyJwtToken(token);
    const getuser = await this.userService.findUser(tokenData.email);
    if (getuser.name != data.buyerName) {
      throw new UnauthorizedException('please login then buy pets');
    }
    const getSeller = await this.petsService.findSeller(data.sellerName);
    const getPet = await this.petsService.findPets(data.petName);
    if (!getSeller || !getPet) {
      throw new NotFoundException('incorrect entered details');
    }
    const sold = new SoldPets();
    sold.user = getuser;
    sold.buyerName = getuser.name;
    sold.petCost = getPet.petCost;
    const newData = Object.assign(sold, data);
    await getManager().query(
      `UPDATE pets SET status='sold_Out' WHERE id=${getPet.id}`
    );
    return await this.soldPetsRepository.save(newData);
  }
}
