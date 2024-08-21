export interface JobType { // Export the JobType interface
  id: number;
  name: string;
}

export interface Posting {
  id: number;
  title: string;
  company: string;
  salaryStart: string;
  salaryEnd: string;
  jobType: JobType; // Ensure jobType is correctly typed
  country: string;
  postedDate: string;
  companyUrl: string;
  jobLink: string;
}

export default Posting;