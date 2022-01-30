import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../Entities/user.entity';
import { loginDto } from './dto/login.dto';
import { jwtServiceClass } from './../../Common/Providers/jwt.service';
import { Request, Response } from 'express';
import { GlobalAccess } from 'src/Common/Access/global.access';
/**This is used to hash the password */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
/**
 * This is a userService class all user related business logics are avaliable here
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtserviceClass: jwtServiceClass
  ) {}

  /**
   * This is a create user method
   * @param data is taken from the user
   * @returns save data in database
   */
  async CreateUser(data: User) {
    const user = new User();
    const newData = Object.assign(user, data);
    return await this.userRepository.save(newData);
  }

  /**
   * This is a login method
   * @param data is taken from the user
   * @param response imported from the express library
   * @returns in credimport { GlobalAccess } from './../../Common/Access/global.access';
intiels are true return success
   */
  async loginUser(data: loginDto, response: Response) {
    const getUser = await this.userRepository.findOne({ email: data.username });
    const match = await bcrypt.compare(data.password, getUser.password);
    if (!getUser || !match) {
      throw new UnauthorizedException('incorrect credentials');
    }
    const jwt = await this.jwtserviceClass.CreateJwtToken(getUser);
    response.cookie('jwt', jwt, { httpOnly: true });
    GlobalAccess.role = getUser.role;
    const { password, ...result } = getUser;
    return result;
  }

  /**
   * This method is used to find user
   * @param email
   * @returns
   */
  async findUser(email: string) {
    const getUser = await this.userRepository.findOne({ email: email });
    return getUser;
  }

  /**
   * This method is used to get roles
   * @param request
   * @returns
   */
  async getRole(request: Request) {
    const token = request.cookies['jwt'];
    const tokenData = await this.jwtserviceClass.verifyJwtToken(token);
    const getuser = await this.findUser(tokenData.email);
    return getuser.role;
  }
}
