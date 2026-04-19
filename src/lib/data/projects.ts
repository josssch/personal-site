import type { Project } from '$lib/types/project'

import Download from '@lucide/svelte/icons/download'
import GitBranch from '@lucide/svelte/icons/git-branch'
import Github from '@lucide/svelte/icons/github'
import Globe from '@lucide/svelte/icons/globe'

// After consideration I have decided to go with this classic approach over a database.
// Given the fact I only want to showcase my larger projects and am setting this up with
// Github pages and workflow, this is more than good enough.

export const projects: Record<string, Project> = {
    orbiting: {
        slug: 'orbiting',
        logoHref: '/img/proj_orbiting_logo.png',
        bannerHref: '/img/proj_orbiting_banner.png',
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
                icon: Github,
                label: 'GitHub',
                href: 'https://github.com/OrbitingTech',
            },
        ],
        technologies: ['MongoDB', 'Redis', 'Svelte', 'Tailwind', 'TypeScript'],
        tags: [],
    },
    'easy-menu': {
        slug: 'easy-menu',
        logoHref: '/img/proj_menu_logo.png',
        bannerHref: '/img/proj_menu_banner.png',
        theme: {
            backgroundColor: 'var(--color-blue-900)',
            backgroundColorsBy: 'var(--color-gray-500)',
            textColor: 'var(--color-blue-200)',
        },
        title: 'Easy Menu',
        summary:
            'A script runner that lives in your macOS menu bar. Run things, without the typing.',
        description: () => import('$lib/ui/projects/MenuBarDescription.svelte'),
        detailComponent: () => import('$lib/ui/projects/MenuBarDetail.svelte'),
        links: [
            {
                icon: GitBranch,
                label: 'View Source',
                href: 'https://github.com/josssch/easy-menu',
            },
            {
                icon: Download,
                label: 'Download for macOS',
                href: 'https://github.com/josssch/easy-menu/releases/latest/download/EasyMenu.dmg',
            },
        ],
        technologies: ['Swift', 'SwiftUI', 'SwiftData'],
        tags: [],
    },
    'mock-ui': {
        slug: 'mock-ui',
        bannerHref: '/img/proj_mock-ui_banner.png',
        theme: {
            backgroundColor: 'var(--color-neutral-900)',
            textColor: 'var(--color-gray-200)',
        },
        title: 'Mock UI',
        summary:
            'A no-fluff starting point for building user interfaces, no setup required. Meant to accelerate minimum viable products and help ship faster.',
        description: () => import('$lib/ui/projects/MockUIDescription.svelte'),
        detailComponent: () => import('$lib/ui/projects/MockUIDetail.svelte'),
        links: [
            {
                icon: Globe,
                label: 'Live Demo',
                href: 'https://mui.jossh.dev',
            },
            {
                icon: GitBranch,
                label: 'View Source',
                href: 'https://github.com/josssch/mock-ui',
            },
        ],
        technologies: ['Svelte', 'Tailwind', 'TypeScript'],
        tags: [],
    },
}
