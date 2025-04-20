<script
    lang="ts"
    module
>
    export interface Project {
        title: string
        summary: string
        description: string
        links: ProjectLink[]
        tags: string[]
    }

    export interface ProjectLink {
        label: string
        href: string
        icon?: Component | SiComponentType
    }
</script>

<script lang="ts">
    import type { SiComponentType } from '@icons-pack/svelte-simple-icons'
    import type { Component } from 'svelte'

    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'

    import merge from '$lib/utils/class-merge'
    import Button from '../form/Button.svelte'

    const { project, class: clazz = '' }: { project: Project; class?: string } = $props()
</script>

<div class={merge('group/project-card max-w-128 rounded-2xl bg-theme-bg-1 p-lg shadow-lg', clazz)}>
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">{project.title}</h1>

        <ArrowUpRight
            class="animate-[up-right_2s_infinite] [animation-play-state:paused] group-hover/project-card:[animation-play-state:running]"
        />
    </div>

    <p class="my-lg text-current/80">{project.summary}</p>

    <div class="flex gap-md">
        {#each project.links as link (link.href)}
            {@const Icon = link.icon}

            <Button
                title={link.label}
                aria-label={link.label}
                class="min-w-12 first:grow not-first:[&>span]:hidden"
                href={link.href}
                target="_blank"
            >
                <Icon title={link.label} />
                <span>{link.label}</span>
            </Button>
        {/each}
    </div>
</div>

<style>
    @keyframes -global-up-right {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
</style>
