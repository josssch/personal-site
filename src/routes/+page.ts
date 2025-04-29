import type { MetaTagsProps } from '$lib/types/meta-tags'
import type { PageLoad } from './$types'

export const load: PageLoad = () => ({
    meta: {
        title: 'Projects',
        description: 'Explore my projects and learn more about my work.',
    } as MetaTagsProps,
})
