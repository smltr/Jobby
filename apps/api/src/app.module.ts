import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingsModule } from './postings/postings.module';
import { JobTypesModule } from './jobtypes/jobtypes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'data.db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PostingsModule,
    JobTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}