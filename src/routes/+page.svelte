<script lang="ts">
    import { replaceState } from '$app/navigation'
    import { page } from '$app/state'
    import { untrack } from 'svelte'

    import { projects } from '$lib/data/projects'
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

    // get the initial index out of the window hash (minus one)
    const initialIndex = window.location.hash ? Number(window.location.hash.slice(1)) - 1 : 0

    const allProjects = Object.values(projects)

    // update the window hash every time the index changes
    // fixme: makes it so users can't edit the hash
    let index = $state(initialIndex)
    $effect(() =>
        replaceState(
            `#${index + 1}`,
            untrack(() => page.state),
        ),
    )
</script>

<svelte:window onkeydown={handleKeyPress} />

<FullscreenCarousel
    bind:this={carousel}
    for={allProjects}
    bind:index
    style="
        --project-theme-bg: {allProjects[index]?.theme.backgroundColor};
        --project-theme-text: {allProjects[index]?.theme.textColor};
    "
    class="theme-bg-(--project-theme-bg) theme-text-(--project-theme-text)"
>
    {#snippet builder(project, state)}
        <ProjectScreen
            {project}
            {state}
        />
    {/snippet}
</FullscreenCarousel>
