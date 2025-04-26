import type { Component } from 'svelte'

export type LazyComponent<T extends Component = Component> = () => Promise<{ default: T }>
