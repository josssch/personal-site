import type { Education } from '$lib/types/education'

export const education: Education[] = [
    {
        type: 'University',
        certification: 'Bachelor of Computer Science',
        startedOn: '2022',
        endedOn: '2026',
        isCurrent: true,
        achievements: ['GPA of 3.8/4.0'],
    },
    {
        type: 'High School',
        certification: 'Specialist High Skills Major (ICT)',
        achievements: [
            'Graduated with Honors',
            'Graduated with Specialist High Skills Major in Information Technology',
        ],
    },
]
