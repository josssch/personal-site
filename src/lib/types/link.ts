import type { Component } from 'svelte'

export interface Link {
    label: string
    href: string
    internal?: boolean
    icon?: Component
}
