import { Test, TestingModule } from '@nestjs/testing';
import { SoldPetsController } from './sold-pets.controller';

describe('SoldPetsController', () => {
  let controller: SoldPetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldPetsController],
    }).compile();

    controller = module.get<SoldPetsController>(SoldPetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
