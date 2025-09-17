<script lang="ts">
    import type { Project } from '$lib/types/project'
    import type { ScreenState } from './FullscreenCarousel.svelte'

    import Maximize from '@lucide/svelte/icons/maximize'

    import { insetSend } from '$lib/inset-transition'
    import merge from '$lib/utils/class-merge'
    import FlyUp from '../animators/FlyUp.svelte'
    import SlideInText from '../animators/SlideInText.svelte'
    import ProjectResources from '../components/ProjectResources.svelte'

    interface Props {
        class?: string
        state: ScreenState
        project: Project
    }

    const { project, state: screenState, class: clazz = '' }: Props = $props()

    let numberTextEl: SlideInText
    let titleTextEl: SlideInText
    let summaryTextEl: SlideInText
    let resourcesEl: FlyUp

    $effect(() => {
        if (screenState.isVisible) {
            numberTextEl.play()
            titleTextEl.play()
            summaryTextEl.play()
            resourcesEl.play()
        }
    })

    const displayNumber = $derived((screenState.index + 1).toString().padStart(2, '0'))
</script>

<div
    style="
        --project-theme-bg: {project.theme.backgroundColor};
        --project-theme-text: {project.theme.textColor};
    "
    class={merge(
        'relative size-full bg-theme-bg text-theme-on-bg theme-bg-(--project-theme-bg) theme-text-(--project-theme-text)',
        clazz,
    )}
>
    <div class="container mx-auto flex h-full p-lg max-md:flex-col sm:p-xl">
        {#if project.detailComponent}
            {#await project.detailComponent() then component}
                <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <component.default {project} />
                </div>
            {/await}
        {/if}

        <div class="z-1 flex h-full flex-col justify-center gap-lg text-xl md:basis-1/2">
            <h1 class="text-4xl">
                <SlideInText
                    bind:this={numberTextEl}
                    settings={{ delayMs: 100, trigger: 'manual' }}
                >
                    <span class="font-extralight text-theme-on-bg-faint">{displayNumber}</span>
                </SlideInText>

                <SlideInText
                    bind:this={titleTextEl}
                    settings={{ trigger: 'manual', delayMs: 50 }}
                >
                    <span class="block bg-theme-on-bg px-sm leading-tight font-bold text-theme-bg">
                        {project.title}
                    </span>
                </SlideInText>
            </h1>

            <SlideInText
                bind:this={summaryTextEl}
                settings={{ trigger: 'manual' }}
            >
                <p class="max-w-prose">{project.summary}</p>
            </SlideInText>

            <FlyUp
                bind:this={resourcesEl}
                settings={{ trigger: 'manual' }}
            >
                <div
                    class="w-fit"
                    out:insetSend|global={{ key: `project-${project.slug}` }}
                >
                    <ProjectResources
                        firstIsPrimary
                        links={[
                            {
                                icon: Maximize,
                                label: 'Read More',
                                href: `/project/${project.slug}`,
                                internal: true,
                            },
                            ...project.links,
                        ]}
                    />
                </div>
            </FlyUp>
        </div>
    </div>
</div>
