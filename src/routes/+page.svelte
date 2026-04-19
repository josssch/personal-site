<script lang="ts">
    import { afterNavigate, replaceState } from '$app/navigation'
    import { page } from '$app/state'
    import { onDestroy, untrack } from 'svelte'

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

    const allProjects = Object.values(projects)

    // get the initial index out of the window hash (minus one)
    const initialHash = window.location.hash ? window.location.hash.slice(1) : null
    const initialIndex = initialHash ? allProjects.findIndex(p => p.slug === initialHash) : -1

    // update the window hash every time the index changes
    // fixme: makes it so users can't edit the hash
    let index = $state(initialIndex >= 0 && initialIndex < allProjects.length ? initialIndex : 0)
    const project = $derived(allProjects[index])

    $effect(() =>
        replaceState(
            project ? `#${project.slug}` : '',
            untrack(() => page.state),
        ),
    )

    afterNavigate(() => {
        if (!project) return

        // this is to let the individual project screen know there was a transition
        // and should display a back button
        replaceState('', {
            from: `/#${project.slug}`,
        })
    })

    const projectThemeBg = $derived(project?.theme.backgroundColor)
    const projectThemeBgBy = $derived(project?.theme.backgroundColorsBy || 'initial')
    const projectThemeText = $derived(project?.theme.textColor)

    $effect(() => {
        document.body.classList.toggle('transition-colors', true)
        document.body.style.backgroundColor = projectThemeBg
    })

    onDestroy(() => {
        document.body.classList.toggle('transition-colors', false)
        document.body.style.backgroundColor = ''
    })
</script>

<svelte:window onkeydown={handleKeyPress} />

<FullscreenCarousel
    bind:this={carousel}
    for={allProjects}
    bind:index
    style="
        --project-theme-bg: {projectThemeBg};
        --project-theme-bg-by: {projectThemeBgBy};
        --project-theme-text: {projectThemeText};
    "
    class="theme-bg-(--project-theme-bg) theme-text-(--project-theme-text) theme-bg-by-(--project-theme-bg-by)"
>
    {#snippet builder(project, state)}
        <ProjectScreen
            {project}
            {state}
        />
    {/snippet}
</FullscreenCarousel>
