import type { WorkExperience } from '$lib/types/work-experience'

export const experience: WorkExperience[] = [
    {
        title: 'System Administrator',
        industry: 'Retail',
        startedOn: 'November 2024',
        isCurrent: true,
        duties: [
            'Created automation tooling for improved efficiency across all retail locations, with custom integrations into POS and inventory systems',
            'Created data pipeline tooling to remove countless manual data entry tasks, saving hundreds of hours of work',
            'Maintained the security of internal systems and networks',
            'Worked closely with CEO to develop business intelligence reporting tools',
        ],
    },
    {
        title: 'Founder & Lead Developer',
        company: 'Orbiting Technologies',
        startedOn: 'April 2024',
        isCurrent: true,
        duties: [
            'Planned, developed, and implemented features for an active user-base',
            'Maintained and handled migrating an active production database between updates',
        ],
    },
    {
        title: 'Full-Stack Software Engineer',
        industry: 'Insurance',
        startedOn: 'February 2022',
        endedOn: 'April 2024',
        duties: [
            'Collaborated with a team to develop and test new features',
            'Developed and maintained a suite of full-stack web applications',
            'Used Azure DevOps for CI/CD workflows',
        ],
    },
    {
        title: 'Full-Stack Software Engineer',
        industry: 'Independent Contracting',
        startedOn: 'September 2017',
        isCurrent: true,
        duties: [
            'Worked closely with clients to understand their needs and workflow',
            'Developed applications tailored to a specific workflow in an iterative manner',
            'Worked with an estimated 50+ unique clients—and counting',
        ],
    },
]
