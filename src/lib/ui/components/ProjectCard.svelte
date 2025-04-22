<script lang="ts">
    import type { Project } from '$lib/types/project'

    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'

    import { insetSend } from '$lib/inset-transition'
    import merge from '$lib/utils/class-merge'
    import ProjectResources from './ProjectResources.svelte'

    const { project, class: clazz = '' }: { project: Project; class?: string } = $props()
</script>

<a
    href="project/{project.slug}"
    class={merge('group/project-card relative block max-w-128 p-lg shadow-lg', clazz)}
>
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">
            {project.title}
        </h1>

        <ArrowUpRight
            aria-label="Open Project Page"
            class="animate-[up-right_2s_infinite] [animation-play-state:paused] group-hover/project-card:[animation-play-state:running]"
        />
    </div>

    <p class="my-lg text-theme-on-bg-faint">
        {project.summary}
    </p>

    <ProjectResources
        firstIsPrimary
        links={project.links}
    />

    <div
        class="absolute inset-0 -z-1 rounded-2xl bg-theme-bg-1"
        out:insetSend|global={{ key: `project-${project.slug}` }}
    ></div>
</a>

<style>
    @keyframes -global-up-right {
        0%,
        100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(2px, -2px);
        }
    }
</style>
