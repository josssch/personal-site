import type { Project } from '$lib/types/project'

import GitBranch from '@lucide/svelte/icons/git-branch'
import Globe from '@lucide/svelte/icons/globe'

// After consideration I have decided to go with this classic approach over a database.
// Given the fact I only want to showcase my larger projects and am setting this up with
// Github pages and workflow, this is more than good enough.

export const projects: Record<string, Project> = {
    orbiting: {
        slug: 'orbiting',
        theme: 'theme-bg-neutral-950 theme-text-neutral-200',
        title: 'Orbiting',
        summary:
            "A beautiful, yet, customizable control panel for all your apps. It's the best way to have complete control over your app in production.",
        description: 'Todo',
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
        tags: [],
        technologies: ['MongoDB', 'Redis', 'Svelte', 'TypeScript', 'Tailwind'],
    },
}
