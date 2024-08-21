import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from './posting.entity';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private postingsRepository: Repository<Posting>,
  ) {}

  private eventSubject = new Subject<Posting>();

  async findAll(
    page: number = 1,
    limit: number = 10,
    jobTypes?: string[],
    salary?: number,
  ): Promise<[Posting[], number]> {
    const query = this.postingsRepository.createQueryBuilder('posting')
      .leftJoinAndSelect('posting.jobType', 'jobType') // Left join to include jobType

    if (jobTypes && jobTypes.length > 0) {
      query.andWhere('jobType.name IN (:...jobTypes)', { jobTypes });
    }

    if (salary) {
      query.andWhere(
        'posting.salaryStart <= :salary AND posting.salaryEnd >= :salary',
        { salary },
      );
    }

    // Add this line to sort by postedDate in descending order
    query.orderBy('posting.postedDate', 'DESC');

    const [results, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [results, total];
  }

  async findOne(id: number): Promise<Posting> {
    const posting = await this.postingsRepository.findOne({
      where: { id },
    });
    if (!posting) {
      throw new NotFoundException(`Posting with ID "${id}" not found`);
    }
    return posting;
  }

  async create(posting: Partial<Posting>): Promise<Posting> {
    const newPosting = this.postingsRepository.create(posting);
    const savedPosting = await this.postingsRepository.save(newPosting);
    this.eventSubject.next(savedPosting);
    return savedPosting;
  }

  getSSEStream() {
    return this.eventSubject.pipe(
      map((posting) => ({ data: JSON.stringify(posting) }))
    );
  }

  async update(id: number, posting: Partial<Posting>): Promise<Posting> {
    await this.postingsRepository.update(id, posting);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Posting with ID "${id}" not found`);
    }
  }
  
  async deleteAll(): Promise<void> {
    await this.postingsRepository.clear();
  }
}