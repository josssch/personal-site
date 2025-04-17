<script lang="ts">
    import merge from '$lib/utils/class-merge'
    import SlideInText from '../animators/SlideInText.svelte'
    import ProjectCard from '../components/ProjectCard.svelte'

    const { index = 0, title, summary, visible = false, class: clazz = '' } = $props()

    // when this component is first initialized, take the state of this prop
    // and if it's true, wait 500ms before playing the animations (this is to account
    // for page animations)
    const wasInitiallyVisible = $state.snapshot(visible)

    let numberTextEl: SlideInText
    let titleTextEl: SlideInText

    $effect(() => {
        if (visible) {
            numberTextEl.play()
            titleTextEl.play()
        }
    })

    const displayNumber = $derived((index + 1).toString().padStart(2, '0'))
</script>

<div class={merge('relative size-full', clazz)}>
    <div class="container mx-auto grid h-full grid-rows-2 px-lg py-xl sm:grid-cols-2 sm:px-xl">
        <h1 class="row-start-1 self-end text-4xl">
            <SlideInText
                bind:this={numberTextEl}
                trigger="manual"
                delayMs={250 + (wasInitiallyVisible ? 500 : 0)}
            >
                <span class="font-extralight">{displayNumber}</span>
            </SlideInText>

            <SlideInText
                bind:this={titleTextEl}
                trigger="manual"
                delayMs={150 + (wasInitiallyVisible ? 500 : 0)}
            >
                <span class="block font-bold">{title}</span>
            </SlideInText>
        </h1>

        <ProjectCard
            class="row-start-2 self-center"
            {title}
            {summary}
        />

        <div class="row-span-full max-sm:hidden">hi</div>
    </div>
</div>
