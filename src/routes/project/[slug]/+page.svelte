<script lang="ts">
    import type { Project } from '$lib/types/project'

    import { goto } from '$app/navigation'
    import { page } from '$app/state'
    import { onMount } from 'svelte'

    import { projects } from '$lib/data/projects'
    import { insetReceive } from '$lib/inset-transition'
    import FlyUp from '$lib/ui/animators/FlyUp.svelte'
    import SlideInText from '$lib/ui/animators/SlideInText.svelte'
    import Detail from '$lib/ui/components/Detail.svelte'
    import DetailsGrid from '$lib/ui/components/DetailsGrid.svelte'
    import Image from '$lib/ui/layout/Image.svelte'
    import ChipSpan from '$lib/ui/typography/ChipSpan.svelte'
    import FancyLink from '$lib/ui/typography/FancyLink.svelte'
    import Markdown from '$lib/ui/typography/Markdown.svelte'

    const BODY_STYLES = ['theme-bg-(--project-theme-bg)', 'theme-text-(--project-theme-text)']

    const project: Project = projects[page.params.slug!]

    const mountTime = Date.now()
    let banner: FlyUp

    onMount(() => {
        const body = document.body

        body.style.setProperty('--project-theme-bg', project.theme.backgroundColor)
        body.style.setProperty('--project-theme-text', project.theme.textColor)
        body.classList.add(...BODY_STYLES)

        return () => {
            body.style.removeProperty('--project-theme-bg')
            body.style.removeProperty('--project-theme-text')
            body.classList.remove(...BODY_STYLES)
        }
    })
</script>

<svelte:window
    onkeydown={e => {
        if (e.key === 'Escape' && page.state.from) {
            goto(page.state.from)
            e.preventDefault()
        }
    }}
/>

<main
    class="main bg-theme-bg-1 text-theme-on-bg"
    in:insetReceive={{ key: `project-${project.slug}` }}
>
    <FlyUp
        bind:this={banner}
        settings={{ trigger: 'manual' }}
    >
        <Image
            onload={() => {
                const diff = Date.now() - mountTime
                setTimeout(banner.play, Math.max(0, 350 - diff))
            }}
            class="min-h-64 w-full bg-center object-cover sm:mx-xl sm:h-[50vh] sm:w-[calc(100%_-_2_*_var(--spacing-xl))] sm:rounded-2xl sm:shadow-lg"
            src={project.bannerHref}
            alt="Project Banner"
            loading="eager"
        />
    </FlyUp>

    <article class="main__article mx-auto mt-xl flex flex-col gap-xl">
        <div>
            <SlideInText settings={{ delayMs: 150 }}>
                <h1 class="mb-md text-4xl font-bold text-balance">{project.title}</h1>
            </SlideInText>

            <SlideInText settings={{ delayMs: 50 }}>
                <p class="text-lg text-theme-on-bg-faint">{project.summary}</p>
            </SlideInText>
        </div>

        <FlyUp>
            <DetailsGrid>
                <Detail title="Resources">
                    {#if project.links.length > 0}
                        <ul>
                            {#each project.links as link (link.href)}
                                <li><FancyLink {link} /></li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="text-sm text-theme-on-bg-faint">
                            No resources currently available.
                        </p>
                    {/if}
                </Detail>

                <Detail title="Technologies Used">
                    <div class="flex flex-wrap gap-sm text-sm">
                        {#each project.technologies as tech (tech)}
                            <ChipSpan>{tech}</ChipSpan>
                        {/each}
                    </div>
                </Detail>
            </DetailsGrid>
        </FlyUp>

        {#await project.description() then component}
            <hr class="border-theme-bg-3" />

            <FlyUp settings={{ threshold: 0.1 }}>
                <Markdown class="font-sans text-wrap text-theme-on-bg sm:text-lg">
                    <component.default {project} />
                </Markdown>
            </FlyUp>
        {/await}
    </article>
</main>
