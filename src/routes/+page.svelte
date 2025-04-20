<script lang="ts">
    import type { ScreenState } from '$lib/ui/carousel/FullscreenCarousel.svelte'

    import FullscreenCarousel from '$lib/ui/carousel/FullscreenCarousel.svelte'
    import ProjectScreen from '$lib/ui/carousel/ProjectScreen.svelte'

    let carousel: FullscreenCarousel

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            carousel.navigateBy(-1)
            event.preventDefault()
            return
        }

        if (event.key === 'ArrowRight') {
            carousel.navigateBy(1)
            event.preventDefault()
        }
    }
</script>

<svelte:window onkeydown={handleKeyPress} />

{#snippet screen1(state: ScreenState)}
    <ProjectScreen
        class="theme-bg-neutral-950 theme-text-neutral-200"
        title="Orbiting"
        summary="A beautiful, yet, customizable control panel for all your apps. It's the best way to have complete control over your app in production."
        {state}
    />
{/snippet}

{#snippet screen2(state: ScreenState)}
    <ProjectScreen
        title="Lorem Ipsum"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim lacus, placerat at velit ut, interdum laoreet velit. Proin sed felis risus."
        {state}
    />
{/snippet}

{#snippet screen3(state: ScreenState)}
    <ProjectScreen
        class="theme-bg-gray-950 theme-text-gray-300"
        title="Lorem Ipsum"
        summary="Praesent nec risus neque. Donec ullamcorper velit risus, quis sagittis dui efficitur ut. Mauris aliquam sed eros a finibus. Duis vestibulum nec nisi et tincidunt."
        {state}
    />
{/snippet}

<FullscreenCarousel
    bind:this={carousel}
    screens={[screen1, screen2, screen3, screen1, screen2, screen3]}
/>
