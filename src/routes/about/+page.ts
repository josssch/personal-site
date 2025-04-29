import type { MetaTagsProps } from '$lib/types/meta-tags'
import type { PageLoad } from './$types'

export const load: PageLoad = () => ({
    meta: { path: '/about' } as MetaTagsProps,
})
