import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JobTypesService } from './jobtypes.service';
import { JobType } from './jobtype.entity';

@Controller('jobtypes')
export class JobTypesController {
  constructor(private readonly jobTypesService: JobTypesService) {}

  @Get()
  findAll(): Promise<JobType[]> {
    return this.jobTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<JobType> {
    return this.jobTypesService.findOne(+id);
  }

  @Post()
  create(@Body() jobType: Partial<JobType>): Promise<JobType> {
    return this.jobTypesService.create(jobType);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() jobType: Partial<JobType>): Promise<JobType> {
    return this.jobTypesService.update(+id, jobType);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.jobTypesService.remove(+id);
  }
}