import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobType } from './jobtype.entity';

@Injectable()
export class JobTypesService {
  constructor(
    @InjectRepository(JobType)
    private jobTypesRepository: Repository<JobType>,
  ) {}

  findAll(): Promise<JobType[]> {
    return this.jobTypesRepository.find();
  }

  async findOne(id: number): Promise<JobType> {
    const jobType = await this.jobTypesRepository.findOne({ where: { id } });
    if (!jobType) {
      throw new NotFoundException(`JobType with id ${id} not found`);
    }
    return jobType;
  }

  create(jobType: Partial<JobType>): Promise<JobType> {
    const newJobType = this.jobTypesRepository.create(jobType);
    return this.jobTypesRepository.save(newJobType);
  }

  async update(id: number, jobType: Partial<JobType>): Promise<JobType> {
    await this.jobTypesRepository.update(id, jobType);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.jobTypesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`JobType with id ${id} not found`);
    }
  }

  // Add this new method to remove all job types
  async removeAll(): Promise<void> {
    await this.jobTypesRepository.clear();
  }
}