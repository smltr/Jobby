import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Will display after job type, e.g. "Generalist" -> "Full Stack Generalist"

  @Column()
  company: string;

  @Column()
  salaryStart: number;

  @Column()
  salaryEnd: number;

  @Column()
  jobType: string; // must be 'Full Stack', 'Front End', or 'Back End'

  @Column()
  postedDate: string;

  @Column()
  country: string;

  @Column()
  jobLink: string;
  
  @Column()
  companyUrl: string; // URL to the company's website
}
