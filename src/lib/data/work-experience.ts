import type { WorkExperience } from '$lib/types/work-experience'

export const experience: WorkExperience[] = [
    {
        title: 'System Administrator',
        industry: 'Retail',
        startedOn: 'November 2024',
        isCurrent: true,
        duties: [
            'Built & maintained software tailored to specific needs, automating previous work that used to take several hours',
            'Administrator over Active Directory and Windows Server',
        ],
    },
    {
        title: 'Founder & Core Maintainer',
        company: 'Orbiting Technologies',
        startedOn: 'April 2024',
        isCurrent: true,
        duties: [
            'Plan, develop, and implement features of an active user-base',
            'Maintaining & migrating an active production database between updates',
        ],
    },
    {
        title: 'Software Engineer',
        industry: 'Insurance',
        startedOn: 'February 2022',
        endedOn: 'April 2024',
        duties: [
            'Developed & maintained a suite of full-stack web applications',
            'Used Azure DevOps for CI/CD workflows',
        ],
    },
]
