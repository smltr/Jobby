import { Test, TestingModule } from '@nestjs/testing';
import { PostingsService } from './postings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from './posting.entity';
import { JobType } from '../jobtypes/jobtype.entity';
import { NotFoundException } from '@nestjs/common';

describe('PostingsService', () => {
  let service: PostingsService;
  let repository: Repository<Posting>;

  const mockJobType = {
    id: 1,
    name: 'Full Stack',
    postings: []
  } as JobType;

  const mockPosting = {
    id: 1,
    title: 'Software Engineer',
    company: 'Netflix',
    salaryStart: 100,
    salaryEnd: 150,
    postedDate: new Date().toISOString(),
    country: 'US',
    jobLink: 'https://www.netflix.com',
    companyUrl: 'https://www.netflix.com',
    jobType: mockJobType
  } as Posting;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockPosting]),
    findOne: jest.fn().mockResolvedValue(mockPosting),
    create: jest.fn().mockReturnValue(mockPosting),
    save: jest.fn().mockResolvedValue(mockPosting),
    update: jest.fn().mockResolvedValue(mockPosting),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    createQueryBuilder: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockPosting], 1]),
      orderBy: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(), // Mock this method
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostingsService,
        {
          provide: getRepositoryToken(Posting),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostingsService>(PostingsService);
    repository = module.get<Repository<Posting>>(getRepositoryToken(Posting));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a posting', async () => {
    expect(await service.create(mockPosting)).toEqual(mockPosting);
  });

  it('should find all postings', async () => {
    const result = await service.findAll(1, 10);
    expect(result[0]).toEqual([mockPosting]);
    expect(result[1]).toEqual(1);
  });

  it('should find one posting', async () => {
    expect(await service.findOne(1)).toEqual(mockPosting);
  });

  it('should update a posting', async () => {
    expect(await service.update(1, mockPosting)).toEqual(mockPosting);
  });

  it('should delete a posting', async () => {
    await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException on missing posting', async () => {
    jest.spyOn(mockRepository, 'findOne').mockResolvedValueOnce(undefined);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});