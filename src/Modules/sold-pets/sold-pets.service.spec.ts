import { Test, TestingModule } from '@nestjs/testing';
import { SoldPetsService } from './sold-pets.service';

describe('SoldPetsService', () => {
  let service: SoldPetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldPetsService],
    }).compile();

    service = module.get<SoldPetsService>(SoldPetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
