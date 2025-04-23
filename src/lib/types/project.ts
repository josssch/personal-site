import type { SiComponentType } from '@icons-pack/svelte-simple-icons'
import type { Component } from 'svelte'

export interface Project {
    slug: string
    theme: ProjectTheme
    title: string
    summary: string
    description: string
    links: ProjectLink[]
    tags: string[]
    technologies: string[]
}

export interface ProjectTheme {
    backgroundColor: string
    textColor: string
}

export interface ProjectLink {
    label: string
    href: string
    icon?: Component | SiComponentType
}
