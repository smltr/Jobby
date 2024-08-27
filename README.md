# jobby.dev

An prototype job posting site.

## The app

The app is a basic prototype of a job site. In its current form you can post and view jobs, sort by job type, and using SSE new jobs are instantly shown when posted (try opening multiple tabs, post a job on one tab, and see it populate on the other). The app is deployed to a Google Cloud VM via a Github action when pushing to the main branch.

- Simplistic design: I like text-first designs and took inspiration from sites like startup.jobs, craigslist, and some personal dev blogs I've seen in the past.
- Full stack: I wanted to get something actually working, in that it's a basic functional app deployed and accessible via a domain.
- My own twist on a job site: I like reimagining things from first principles. This site is inspired by my own experience looking for and applying for jobs. While it doesn't have a full feature set, the idea is to minimize clutter and filler, keep things simple and obvious, and give a 1:1 job employer/applicant experience (an applicant can easily click new job and see what th employer sees, and the employer sees what the applicant will see when creating a new posting).

## What's still needed

- Add features such as search, job description, and user accounts to keep track of applications/applicants
- Add QOL features such as ability to click on a job to highlight it in some way so user can read through list and keep track of what they want to apply to without having to 'save' job somewhere
- Refine UI, for example making the post new job more compact
- Refine and document API for access to jobs without front end

