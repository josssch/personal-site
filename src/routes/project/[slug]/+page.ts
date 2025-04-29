import type { MetaTagsProps } from '$lib/types/meta-tags'
import type { EntryGenerator, PageLoad } from './$types'

import { projects } from '$lib/data/projects'

// because I am doing static rendering, this is used by the static adapter
// to prerender all of the project pages
export const entries: EntryGenerator = () => Object.keys(projects).map(slug => ({ slug }))

export const load: PageLoad = ({ params }) => {
    const project = projects[params.slug]

    return {
        meta: {
            title: project.title,
            description: project.summary,
            path: `/project/${project.slug}`,
            imagePath: project.bannerHref,
            imageAlt: `Banner image for ${project.title}`,
        } as MetaTagsProps,
    }
}
