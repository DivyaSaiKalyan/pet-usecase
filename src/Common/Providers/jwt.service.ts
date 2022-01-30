import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './../../Entities/user.entity';

/**
 * This is a jwt service class all jwt related methjod is avaliabale here
 */
@Injectable()
export class jwtServiceClass {
  constructor(private readonly jwtservice: JwtService) {}

  /**
   * This is create token method
   * @param user
   * @returns
   */
  async CreateJwtToken(user: User) {
    const jwt = await this.jwtservice.signAsync({ email: user.email });
    return jwt;
  }
  /**This is verify token method */
  async verifyJwtToken(token: string) {
    const verifyToken = await this.jwtservice.verifyAsync(token);
    return verifyToken;
  }

  /**This is delete token method */
  async deleteToken(response: Response): Promise<string> {
    response.clearCookie('jwt');
    return 'logout success';
  }
}
