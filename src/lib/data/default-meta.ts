import type { MetaTagsProps } from '$lib/types/meta-tags'

import { PUBLIC_SITE_BASE_URL } from '$env/static/public'

const SITE_NAME = 'Josh • Software Engineer'

export const DEFAULT_META_TAGS: MetaTagsProps = {
    formatTitle: title => (title ? `${title} • ${SITE_NAME}` : SITE_NAME),

    description:
        'A full-stack software engineer and contractor with a lot of experience in the insurance and retail industries.',

    urlFromPath: path => `${PUBLIC_SITE_BASE_URL}${path}`,
    path: '/',

    openGraphSiteName: SITE_NAME,
}
