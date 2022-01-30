import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Pets } from './../../Entities/pets.entity';
import { UserService } from './../user/user.service';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';

/**
 * This is pets service class
 */
@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private readonly petsRepository: Repository<Pets>,
    private readonly userService: UserService,
    private readonly jwtserviceClass: jwtServiceClass
  ) {}

  /**
   * This method is used to add pets into database for preffered roles only
   * @param data
   * @param request
   * @returns
   */
  async addPets(data: Pets, request: Request) {
    const token = request.cookies['jwt'];
    const tokenData = await this.jwtserviceClass.verifyJwtToken(token);
    const getUser = await this.userService.findUser(tokenData.email);
    if (!getUser) {
      throw new UnauthorizedException(
        'please login the add data into database'
      );
    }
    const pets = new Pets();
    pets.createdBy = getUser.name;
    const newData = Object.assign(pets, data);
    return await this.petsRepository.save(newData);
  }

  /**
   * This method is used to find all pets
   * @returns all pets avaliable in database
   */
  async getPets() {
    return await this.petsRepository.find();
  }

  /**
   * This method is used to find the register seller
   * @param sellerName
   * @returns seller info
   */
  async findSeller(sellerName: string) {
    const seller = await this.petsRepository.findOne({
      sellerName: sellerName
    });
    if (!seller) {
      throw new NotFoundException(
        'seller is not avaliable in the register list'
      );
    }
    return seller;
  }

  /**
   * This method is used to find the pet
   * @param petName
   * @returns pet info
   */
  async findPets(petName: string) {
    const petInfo = await this.petsRepository.findOne({
      petName: petName
    });
    if (!petInfo) {
      throw new NotFoundException('pet is not avaliable in the register list');
    }
    return petInfo;
  }
}
