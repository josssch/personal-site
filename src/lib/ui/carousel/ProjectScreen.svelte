<script lang="ts">
    import type { Project } from '$lib/types/project'
    import type { ScreenState } from './FullscreenCarousel.svelte'

    import merge from '$lib/utils/class-merge'
    import FlyUp from '../animators/FlyUp.svelte'
    import SlideInText from '../animators/SlideInText.svelte'
    import ProjectCard from '../components/ProjectCard.svelte'

    interface Props {
        class?: string
        state: ScreenState
        project: Project
    }

    const { project, state: screenState, class: clazz = '' }: Props = $props()

    let numberTextEl: SlideInText
    let titleTextEl: SlideInText
    let projectCardEl: FlyUp

    $effect(() => {
        if (screenState.isVisible) {
            numberTextEl.play()
            titleTextEl.play()
            projectCardEl.play()
        }
    })

    const displayNumber = $derived((screenState.index + 1).toString().padStart(2, '0'))
</script>

<div class={merge('relative size-full bg-theme-bg text-theme-on-bg', project.theme, clazz)}>
    <div
        class="container mx-auto grid h-full grid-rows-2 gap-xl px-lg py-xl sm:px-xl lg:grid-cols-2"
    >
        <h1 class="col-start-1 self-end text-4xl">
            <SlideInText
                bind:this={numberTextEl}
                settings={{ delayMs: 100, trigger: 'manual' }}
            >
                <span class="font-extralight">{displayNumber}</span>
            </SlideInText>

            <SlideInText
                bind:this={titleTextEl}
                settings={{ trigger: 'manual' }}
            >
                <span class="block font-bold">{project.title}</span>
            </SlideInText>
        </h1>

        <div class="col-start-1">
            <FlyUp
                bind:this={projectCardEl}
                settings={{ trigger: 'manual' }}
            >
                <ProjectCard
                    class="transition-transform hover:-translate-y-1"
                    {project}
                />
            </FlyUp>
        </div>

        <!-- <div class="col-start-2 row-span-full max-sm:hidden">hi</div> -->
    </div>
</div>
