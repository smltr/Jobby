import { Test, TestingModule } from '@nestjs/testing';
import { JobTypesService } from './jobtypes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobType } from './jobtype.entity';
import { NotFoundException } from '@nestjs/common';

describe('JobTypesService', () => {
  let service: JobTypesService;
  let repository: Repository<JobType>;

  const mockJobType = {
    id: 1,
    name: 'Full Stack',
    postings: [],
  } as JobType;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockJobType]),
    findOne: jest.fn().mockResolvedValue(mockJobType),
    create: jest.fn().mockReturnValue(mockJobType),
    save: jest.fn().mockResolvedValue(mockJobType),
    update: jest.fn().mockResolvedValue(mockJobType),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobTypesService,
        {
          provide: getRepositoryToken(JobType),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JobTypesService>(JobTypesService);
    repository = module.get<Repository<JobType>>(getRepositoryToken(JobType));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a job type', async () => {
    expect(await service.create(mockJobType)).toEqual(mockJobType);
  });

  it('should find all job types', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockJobType]);
  });

  it('should find one job type', async () => {
    expect(await service.findOne(1)).toEqual(mockJobType);
  });

  it('should update a job type', async () => {
    expect(await service.update(1, mockJobType)).toEqual(mockJobType);
  });

  it('should delete a job type', async () => {
    await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException on missing job type', async () => {
    jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});