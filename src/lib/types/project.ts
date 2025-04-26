import type { Component } from 'svelte'
import type { LazyComponent } from './lazy-component'
import type { Link } from './link'

export interface Project {
    slug: string
    theme: ProjectTheme
    title: string
    summary: string
    description: LazyComponent<ProjectDetailComponent>
    links: Link[]
    tags: string[]
    technologies: string[]

    logoHref?: string
    bannerHref?: string
    detailComponent?: LazyComponent<ProjectDetailComponent>
}

export type ProjectDetailComponent = Component<{ project: Project } | any>

export interface ProjectTheme {
    backgroundColor: string
    textColor: string
}
