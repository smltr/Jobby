# jobby.dev

An example job posting site.

## The app

The app is a basic prototype of an idea I've been thinking about doing as a personal side project. In its current form you can post and view jobs, sort by job type, and using SSE new jobs are instantly shown when posted (try opening multiple tabs, post a job on one tab, and see it populate on the other). The app is deployed to a Google Cloud VM via a Github action when pushing to the main branch.

## General Thoughts

My goal was to check all of the boxes given for the test while keeping scope tight to deliver something in a timely manner. I also tried to put my own spin on things. I think that spin is:

- Simplistic design: I like text-first designs and took inspiration from sites like startup.jobs, craigslist, and some personal dev blogs I've seen in the past.
- Truly full stack: I wanted to get something actually working, in that it's a basic functional app deployed and accessible via a domain.
- Entrepreneurial: I like thinking things from first principles. This site is inspired by my own experience looking for and applying for jobs. While it doesn't have a full feature set, the idea is to minimize clutter and filler, keep things simple and obvious, and give a 1:1 job employer/applicant experience (an applicant can easily click new job and see what th employer sees, and the employer sees what the applicant will see when creating a new posting).

## What I left out

As mentioned I tried to keep things simple and features to a minimum so I could deliver sometihng polished, so there are definitely things I left out. If I had more time or this was a real project, I would definitely:

- Add features such as search, job description, and user accounts to keep track of applications/applicants
- Add QOL features such as ability to click on a job to highlight it in some way so user can read through list and keep track of what they want to apply to without having to 'save' job somewhere
- Refine UI, for example making the post new job more compact

