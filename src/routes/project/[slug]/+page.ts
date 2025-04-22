import type { EntryGenerator } from './$types'

import { projects } from '$lib/data/projects'

// because I am doing static rendering, this is used by the static adapter
// to prerender all of the project pages
export const entries: EntryGenerator = () => Object.keys(projects).map(slug => ({ slug }))
