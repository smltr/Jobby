import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Posting } from '../postings/posting.entity';

@Entity()
export class JobType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Posting, posting => posting.jobType)
  postings: Posting[];
}