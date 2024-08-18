import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PostingsService } from './src/postings/postings.service';
import { Posting } from './src/postings/posting.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postingsService = app.get(PostingsService);

  await postingsService.deleteAll();
  console.log('All postings have been erased!');

  const postings: Partial<Posting>[] = [
    {
      title: 'Software Engineer',
      company: 'Netflix',
      companyUrl: 'https://www.netflix.com',
      jobLink: 'https://www.netflix.com',
      salaryStart: 100,
      salaryEnd: 150,
      jobType: 'Full Stack',
      country: 'US',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Frontend Developer',
      company: 'Google',
      companyUrl: 'https://www.google.com',
      jobLink: 'https://www.google.com',
      salaryStart: 120,
      salaryEnd: 160,
      jobType: 'Front End',
      country: 'CA',
      postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Backend Engineer',
      company: 'Amazon',
      companyUrl: 'https://www.amazon.com',
      jobLink: 'https://www.amazon.com',
      salaryStart: 150,
      salaryEnd: 190,
      jobType: 'Back End',
      country: 'UK',
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    
    {
      title: 'Data Scientist',
      company: 'Facebook',
      companyUrl: 'https://www.facebook.com',
      jobLink: 'https://www.facebook.com',
      salaryStart: 130,
      salaryEnd: 170,
      jobType: 'Data',
      country: 'US',
      postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    
    {
      title: 'DevOps Engineer',
      company: 'Microsoft',
      companyUrl: 'https://www.microsoft.com',
      jobLink: 'https://www.microsoft.com',
      salaryStart: 140,
      salaryEnd: 180,
      jobType: 'DevOps',
      country: 'US',
      postedDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Twitter',
      companyUrl: 'https://www.twitter.com',
      jobLink: 'https://www.twitter.com',
      salaryStart: 135,
      salaryEnd: 175,
      jobType: 'AI',
      country: 'US',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Full Stack Developer',
      company: 'Spotify',
      companyUrl: 'https://www.spotify.com',
      jobLink: 'https://www.spotify.com',
      salaryStart: 110,
      salaryEnd: 160,
      jobType: 'Full Stack',
      country: 'US',
      postedDate: new Date().toISOString(),
    },
    {
      title: 'Senior Full Stack Developer',
      company: 'Airbnb',
      companyUrl: 'https://www.airbnb.com',
      jobLink: 'https://www.airbnb.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: 'Full Stack',
      country: 'US',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Backend Software Engineer',
      company: 'Uber',
      companyUrl: 'https://www.uber.com',
      jobLink: 'https://www.uber.com',
      salaryStart: 120,
      salaryEnd: 170,
      jobType: 'Back End',
      country: 'US',
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Data Engineer',
      company: 'LinkedIn',
      companyUrl: 'https://www.linkedin.com',
      jobLink: 'https://www.linkedin.com',
      salaryStart: 125,
      salaryEnd: 175,
      jobType: 'Data',
      country: 'US',
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'AI Research Scientist',
      company: 'OpenAI',
      companyUrl: 'https://www.openai.com',
      jobLink: 'https://www.openai.com',
      salaryStart: 150,
      salaryEnd: 200,
      jobType: 'AI',
      country: 'US',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Senior DevOps Engineer',
      company: 'Atlassian',
      companyUrl: 'https://www.atlassian.com',
      jobLink: 'https://www.atlassian.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: 'DevOps',
      country: 'AU',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Full Stack JavaScript Developer',
      company: 'Slack',
      companyUrl: 'https://www.slack.com',
      jobLink: 'https://www.slack.com',
      salaryStart: 115,
      salaryEnd: 165,
      jobType: 'Full Stack',
      country: 'CA',
      postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Backend Java Engineer',
      company: 'Oracle',
      companyUrl: 'https://www.oracle.com',
      jobLink: 'https://www.oracle.com',
      salaryStart: 130,
      salaryEnd: 180,
      jobType: 'Back End',
      country: 'US',
      postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Frontend UX/UI Developer',
      company: 'Adobe',
      companyUrl: 'https://www.adobe.com',
      jobLink: 'https://www.adobe.com',
      salaryStart: 110,
      salaryEnd: 160,
      jobType: 'Front End',
      country: 'US',
      postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Machine Learning Engineer',
      company: 'IBM',
      companyUrl: 'https://www.ibm.com',
      jobLink: 'https://www.ibm.com',
      salaryStart: 140,
      salaryEnd: 190,
      jobType: 'AI',
      country: 'US',
      postedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  for (const posting of postings) {
    await postingsService.create(posting);
  }

  console.log('3 postings have been added!');
  await app.close();
}

seed();
