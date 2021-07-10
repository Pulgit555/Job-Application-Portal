# Job Application Portal
A web application portal developed in mern stack allowing applicants to apply for jobs and recruiter to create jobs and respond to applications received.

## How to Start?
#### Requirements
* Install node, npm, nodemon and mongodb.
``` 
In backend folder 
>npm install
>nodemon server
```
```
In frontend folder
>npm install
>npm start
```
## Features

* Common Login and Registration portal for both recruiter and applicant.
* Applicant can view and edit their profile. They can view the job listing dashboard having filter, sort and search options.
* They can apply for any job (maximum 10 at a time) after writing the SOP and can see all their applications in my application section.
* Recruiter can view and edit their profile and create new jobs.
* They can see all their job listing and all the non-rejected applicants who have applied for a particular job.
* They can shortlist/accept/reject the applicants and see all the employees accepted by the recruiter.
* Recruiter and applicant can rate each and other and rating is dynamic.
* Handles all the edge cases and automatically delete all the listing after deadline, all the applications by applicant who already get selected, does not allow other applicants to apply if the maximum cap is filled.

