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
  title: string; 

  @Column()
  company: string;

  @Column()
  salaryStart: number;

  @Column()
  salaryEnd: number;

  @Column()
  jobType: string; 

  @Column()
  postedDate: string;

  @Column()
  country: string;

  @Column()
  jobLink: string;
  
  @Column()
  companyUrl: string; 
}
