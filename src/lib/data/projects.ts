import type { Project } from '$lib/types/project'

import GitBranch from '@lucide/svelte/icons/git-branch'
import Globe from '@lucide/svelte/icons/globe'

// After consideration I have decided to go with this classic approach over a database.
// Given the fact I only want to showcase my larger projects and am setting this up with
// Github pages and workflow, this is more than good enough.

export const projects: Record<string, Project> = {
    orbiting: {
        logoHref: '/img/proj_orbiting_logo.png',
        bannerHref: '/img/proj_orbiting_banner.png',
        slug: 'orbiting',
        theme: {
            backgroundColor: 'var(--color-neutral-950)',
            textColor: 'var(--color-neutral-200)',
        },
        title: 'Orbiting',
        summary:
            "A beautiful, yet, customizable control panel for all your apps. It's the best way to have complete control over your app in production.",
        description: () => import('$lib/ui/projects/OrbitingDescription.svelte'),
        detailComponent: () => import('$lib/ui/projects/OrbitingDetail.svelte'),
        links: [
            {
                icon: Globe,
                label: 'Website',
                href: 'https://orbiting.app',
            },
            {
                icon: GitBranch,
                label: 'Github',
                href: 'https://github.com/OrbitingTech',
            },
        ],
        technologies: ['MongoDB', 'Redis', 'Svelte', 'Tailwind', 'TypeScript'],
        tags: [],
    },
}
