import type { WorkExperience } from '$lib/types/work-experience'

export const experience: WorkExperience[] = [
    {
        title: 'System Administrator',
        industry: 'Retail',
        startedOn: 'November 2024',
        isCurrent: true,
        duties: [
            'Building and maintaining software tailored to integrate into existing systems',
            'Automating work that previously took several man hours weekly',
            'Administrator over Active Directory and Windows Server',
        ],
    },
    {
        title: 'Founder & Lead Developer',
        company: 'Orbiting Technologies',
        startedOn: 'April 2024',
        isCurrent: true,
        duties: [
            'Planning, developing, and implementing features for an active user-base',
            'Maintaining and migrating an active production database between updates',
        ],
    },
    {
        title: 'Full-Stack Software Engineer',
        industry: 'Insurance',
        startedOn: 'February 2022',
        endedOn: 'April 2024',
        duties: [
            'Developed and maintained a suite of full-stack web applications',
            'Collaborated with a team to develop and test new features',
            'Used Azure DevOps for CI/CD workflows',
        ],
    },
    {
        title: 'Full-Stack Software Engineer',
        industry: 'Independent Contracting',
        startedOn: 'September 2017',
        isCurrent: true,
        duties: [
            'Working closely with clients to understand their needs and workflow',
            'Developing applications tailored to that specific workflow in an iterative manner',
            'Worked with an estimated 50+ unique clients—and counting',
        ],
    },
]
