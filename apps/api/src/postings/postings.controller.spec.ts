import { Test, TestingModule } from '@nestjs/testing';
import { PostingsController } from './postings.controller';
import { PostingsService } from './postings.service';
import { Posting } from './posting.entity';
import { JobType } from '../jobtypes/jobtype.entity';

describe('PostingsController', () => {
  let controller: PostingsController;
  let service: PostingsService;

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

  const mockPostingsService = {
    findAll: jest.fn().mockResolvedValue([[mockPosting], 1]),
    findOne: jest.fn().mockResolvedValue(mockPosting),
    create: jest.fn().mockResolvedValue(mockPosting),
    update: jest.fn().mockResolvedValue(mockPosting),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostingsController],
      providers: [PostingsService],
    })
      .overrideProvider(PostingsService)
      .useValue(mockPostingsService)
      .compile();

    controller = module.get<PostingsController>(PostingsController);
    service = module.get<PostingsService>(PostingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a posting', async () => {
    expect(await controller.create(mockPosting)).toEqual(mockPosting);
  });

  it('should find all postings', async () => {
    const result = await controller.findAll(1, 10, undefined, undefined);
    expect(result.results).toEqual([mockPosting]);
    expect(result.total).toEqual(1);
  });

  it('should find one posting', async () => {
    expect(await controller.findOne('1')).toEqual(mockPosting);
  });

  it('should update a posting', async () => {
    expect(await controller.update('1', mockPosting)).toEqual(mockPosting);
  });

  it('should delete a posting', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});