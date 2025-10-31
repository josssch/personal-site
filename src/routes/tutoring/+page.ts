import type { MetaTagsProps } from '$lib/types/meta-tags'
import type { PageLoad } from './$types'

export const load: PageLoad = ({}) => ({
    meta: {
        title: 'Programming Tutoring',
        description:
            'Get the best programming tutor to help you learn and excel in the fundamentals of coding.',
        path: '/tutoring',
    } as MetaTagsProps,
})
