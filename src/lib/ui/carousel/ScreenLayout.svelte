<script lang="ts">
    import type { ScreenState } from './FullscreenCarousel.svelte'

    import merge from '$lib/utils/class-merge'
    import FlyUp from '../animators/FlyUp.svelte'
    import SlideInText from '../animators/SlideInText.svelte'
    import ProjectCard from '../components/ProjectCard.svelte'

    const {
        title,
        summary,
        state: screenState,
        class: clazz = '',
    }: { class?: string; state: ScreenState; title: string; summary: string } = $props()

    // when this component is first initialized, take the state of this prop
    // and if it's true, wait 500ms before playing the animations (this is to account
    // for page animations)
    const initialDelay = $state.snapshot(screenState.isVisible) ? 750 : 0

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

<div class={merge('relative size-full bg-theme-bg text-theme-on-bg', clazz)}>
    <div class="container mx-auto grid h-full grid-rows-2 px-lg py-xl sm:px-xl lg:grid-cols-2">
        <h1 class="col-start-1 self-end text-4xl">
            <SlideInText
                bind:this={numberTextEl}
                settings={{ delayMs: initialDelay + 100, trigger: 'manual' }}
            >
                <span class="font-extralight">{displayNumber}</span>
            </SlideInText>

            <SlideInText
                bind:this={titleTextEl}
                settings={{ delayMs: initialDelay, trigger: 'manual' }}
            >
                <span class="block font-bold">{title}</span>
            </SlideInText>
        </h1>

        <div class="col-start-1 self-center">
            <FlyUp
                bind:this={projectCardEl}
                settings={{ delayMs: initialDelay, trigger: 'manual' }}
            >
                <ProjectCard
                    {title}
                    {summary}
                />
            </FlyUp>
        </div>

        <!-- <div class="col-start-2 row-span-full max-sm:hidden">hi</div> -->
    </div>
</div>
