import type { SiComponentType } from '@icons-pack/svelte-simple-icons'
import type { Component } from 'svelte'

export interface Project {
    slug: string
    theme?: string
    title: string
    summary: string
    description: string
    links: ProjectLink[]
    tags: string[]
    technologies: string[]
}

export interface ProjectLink {
    label: string
    href: string
    icon?: Component | SiComponentType
}
