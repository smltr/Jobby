import { Test, TestingModule } from '@nestjs/testing';
import { JobTypesController } from './jobtypes.controller';
import { JobTypesService } from './jobtypes.service';
import { JobType } from './jobtype.entity';

describe('JobTypesController', () => {
  let controller: JobTypesController;
  let service: JobTypesService;

  const mockJobType = {
    id: 1,
    name: 'Full Stack',
    postings: [],
  } as JobType;

  const mockJobTypesService = {
    findAll: jest.fn().mockResolvedValue([mockJobType]),
    findOne: jest.fn().mockResolvedValue(mockJobType),
    create: jest.fn().mockResolvedValue(mockJobType),
    update: jest.fn().mockResolvedValue(mockJobType),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobTypesController],
      providers: [JobTypesService],
    })
      .overrideProvider(JobTypesService)
      .useValue(mockJobTypesService)
      .compile();

    controller = module.get<JobTypesController>(JobTypesController);
    service = module.get<JobTypesService>(JobTypesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a job type', async () => {
    expect(await controller.create(mockJobType)).toEqual(mockJobType);
  });

  it('should find all job types', async () => {
    expect(await controller.findAll()).toEqual([mockJobType]);
  });

  it('should find one job type', async () => {
    expect(await controller.findOne('1')).toEqual(mockJobType);
  });

  it('should update a job type', async () => {
    expect(await controller.update('1', mockJobType)).toEqual(mockJobType);
  });

  it('should delete a job type', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});