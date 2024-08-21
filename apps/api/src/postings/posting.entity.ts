import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { JobType } from '../jobtypes/jobtype.entity';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column()
  company: string;

  @Column()
  salaryStart: number;

  @Column()
  salaryEnd: number;

  @Column()
  postedDate: string;

  @Column()
  country: string;

  @Column()
  jobLink: string;
  
  @Column()
  companyUrl: string; 

  @ManyToOne(() => JobType, jobType => jobType.postings, { eager: true })
  jobType: JobType;

}
