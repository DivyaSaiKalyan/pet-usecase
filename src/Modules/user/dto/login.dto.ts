import { ApiProperty } from '@nestjs/swagger';
/**
 * This is login dto
 */
export class loginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
