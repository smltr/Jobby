import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PostingsService } from './src/postings/postings.service';
import { Posting } from './src/postings/posting.entity';
import { JobTypesService } from './src/jobtypes/jobtypes.service';
import { JobType } from './src/jobtypes/jobtype.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postingsService = app.get(PostingsService);
  const jobTypesService = app.get(JobTypesService);

  // Clear existing postings and job types
  await postingsService.deleteAll();
  await jobTypesService.removeAll(); // Assuming there's a similar removeAll method in JobTypesService
  console.log('All postings and job types have been erased!');

  // Define job types
  const jobTypeNames = ['Full Stack', 'Front End', 'Back End', 'Dev Ops', 'Data', 'AI'];

  // Create job types
  const jobTypes: JobType[] = [];
  for (const name of jobTypeNames) {
    const jobType = await jobTypesService.create({ name });
    jobTypes.push(jobType);
  }

  // Find job type by name
  const findJobTypeByName = (name: string): JobType | undefined => {
    return jobTypes.find((jobType) => jobType.name === name);
  };

  // Define postings with associated job types
  const postings: Partial<Posting>[] = [
    {
      title: 'Software Engineer',
      company: 'Netflix',
      companyUrl: 'https://www.netflix.com',
      jobLink: 'https://www.netflix.com',
      salaryStart: 100,
      salaryEnd: 150,
      jobType: findJobTypeByName('Full Stack'),
      country: 'USA',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Frontend Developer',
      company: 'Google',
      companyUrl: 'https://www.google.com',
      jobLink: 'https://www.google.com',
      salaryStart: 120,
      salaryEnd: 160,
      jobType: findJobTypeByName('Front End'),
      country: 'CAN',
      postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Backend Engineer',
      company: 'Amazon',
      companyUrl: 'https://www.amazon.com',
      jobLink: 'https://www.amazon.com',
      salaryStart: 150,
      salaryEnd: 190,
      jobType: findJobTypeByName('Back End'),
      country: 'USA',
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Data Scientist',
      company: 'Facebook',
      companyUrl: 'https://www.facebook.com',
      jobLink: 'https://www.facebook.com',
      salaryStart: 130,
      salaryEnd: 170,
      jobType: findJobTypeByName('Data'),
      country: 'USA',
      postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'DevOps Engineer',
      company: 'Microsoft',
      companyUrl: 'https://www.microsoft.com',
      jobLink: 'https://www.microsoft.com',
      salaryStart: 140,
      salaryEnd: 180,
      jobType: findJobTypeByName('Dev Ops'),
      country: 'USA',
      postedDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Twitter',
      companyUrl: 'https://www.twitter.com',
      jobLink: 'https://www.twitter.com',
      salaryStart: 135,
      salaryEnd: 175,
      jobType: findJobTypeByName('AI'),
      country: 'USA',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Full Stack Developer',
      company: 'Spotify',
      companyUrl: 'https://www.spotify.com',
      jobLink: 'https://www.spotify.com',
      salaryStart: 110,
      salaryEnd: 160,
      jobType: findJobTypeByName('Full Stack'),
      country: 'USA',
      postedDate: new Date().toISOString(),    
    },
    {
      title: 'Senior Full Stack Developer',
      company: 'Airbnb',
      companyUrl: 'https://www.airbnb.com',
      jobLink: 'https://www.airbnb.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: findJobTypeByName('Full Stack'),
      country: 'USA',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
    },
    {
      title: 'Backend Software Engineer',
      company: 'Uber',
      companyUrl: 'https://www.uber.com',
      jobLink: 'https://www.uber.com',
      salaryStart: 120,
      salaryEnd: 170,
      jobType: findJobTypeByName('Back End'),
      country: 'CAN',
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'Data Engineer',
      company: 'LinkedIn',
      companyUrl: 'https://www.linkedin.com',
      jobLink: 'https://www.linkedin.com',
      salaryStart: 125,
      salaryEnd: 175,
      jobType: findJobTypeByName('Data'),
      country: 'USA',
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'AI Research Scientist',
      company: 'OpenAI',
      companyUrl: 'https://www.openai.com',
      jobLink: 'https://www.openai.com',
      salaryStart: 150,
      salaryEnd: 200,
      jobType: findJobTypeByName('AI'),
      country: 'USA',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'Senior DevOps Engineer',
      company: 'Atlassian',
      companyUrl: 'https://www.atlassian.com',
      jobLink: 'https://www.atlassian.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: findJobTypeByName('Dev Ops'),
      country: 'CAN',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'Full Stack JavaScript Developer',
      company: 'Slack',
      companyUrl: 'https://www.slack.com',
      jobLink: 'https://www.slack.com',
      salaryStart: 115,
      salaryEnd: 165,
      jobType: findJobTypeByName('Full Stack'),
      country: 'CAN',
      postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'Backend Java Engineer',
      company: 'Oracle',
      companyUrl: 'https://www.oracle.com',
      jobLink: 'https://www.oracle.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: findJobTypeByName('Back End'),
      country: 'USA',
      postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),    
    },
    {
      title: 'Frontend UX/UI Developer',
      company: 'Adobe',
      companyUrl: 'https://www.adobe.com',
      jobLink: 'https://www.adobe.com',
      salaryStart: 110,
      salaryEnd: 160,
      jobType: findJobTypeByName('Front End'),
      country: 'USA',
      postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),  
    },
    {
      title: 'Machine Learning Engineer',
      company: 'IBM',
      companyUrl: 'https://www.ibm.com',
      jobLink: 'https://www.ibm.com',
      salaryStart: 140,
      salaryEnd: 190,
      jobType: findJobTypeByName('AI'),
      country: 'USA',
      postedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Create postings
  for (const posting of postings) {
    await postingsService.create(posting);
  }

  console.log('Postings have been added!');
  await app.close();
}

seed();