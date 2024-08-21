import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTypesController } from './jobtypes.controller';
import { JobTypesService } from './jobtypes.service';
import { JobType } from './jobtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobType])],
  controllers: [JobTypesController],
  providers: [JobTypesService],
})
export class JobTypesModule {}