import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Sse,
  MessageEvent
} from '@nestjs/common';
import { PostingsService } from './postings.service';
import { Posting } from './posting.entity';
import { Observable } from 'rxjs';

@Controller('postings')
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.postingsService.getSSEStream();
  }

  @Post()
  create(@Body() posting: Partial<Posting>): Promise<Posting> {
    return this.postingsService.create(posting);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('jobTypes') jobTypes?: string | string[],
    @Query('salary') salary?: number,
  ) {
    let parsedJobTypes: string[] | undefined;

    if (typeof jobTypes === 'string') {
      parsedJobTypes = jobTypes.split(',');
    } else if (Array.isArray(jobTypes)) {
      parsedJobTypes = jobTypes;
    }

    const [results, total] = await this.postingsService.findAll(
      page,
      limit,
      parsedJobTypes,
      salary,
    );
    return {
      results,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posting> {
    return this.postingsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() posting: Partial<Posting>,
  ): Promise<Posting> {
    return this.postingsService.update(+id, posting);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postingsService.remove(+id);
  }
}