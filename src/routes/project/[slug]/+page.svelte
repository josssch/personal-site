<script lang="ts">
    import type { Project } from '$lib/types/project'

    import { page } from '$app/state'
    import { onMount } from 'svelte'

    import { projects } from '$lib/data/projects'
    import { insetReceive } from '$lib/inset-transition'
    import FlyUp from '$lib/ui/animators/FlyUp.svelte'
    import SlideInText from '$lib/ui/animators/SlideInText.svelte'
    import Image from '$lib/ui/layout/Image.svelte'
    import ChipSpan from '$lib/ui/typography/ChipSpan.svelte'

    const BODY_STYLES = ['theme-bg-(--project-theme-bg)', 'theme-text-(--project-theme-text)']

    const project: Project = projects[page.params.slug]

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
            class="h-[50vh] min-h-64 w-full bg-center object-cover object-bottom sm:mx-xl sm:w-[calc(100%_-_2*var(--spacing-xl))] sm:rounded-2xl sm:shadow-lg"
            src="https://picsum.photos/1920/1080"
            alt="Project Banner"
            loading="eager"
        />
    </FlyUp>

    <article class="main__article mx-auto mt-xl flex flex-col gap-xl">
        <div>
            <SlideInText settings={{ delayMs: 150 }}>
                <h1 class="mb-md text-3xl font-bold text-balance">{project.title}</h1>
            </SlideInText>

            <SlideInText settings={{ delayMs: 50 }}>
                <p class="text-theme-on-bg-faint">{project.summary}</p>
            </SlideInText>
        </div>

        <FlyUp>
            <div class="grid gap-xl sm:grid-cols-2">
                <div>
                    <h2 class="mb-lg text-lg font-medium">Resources</h2>

                    <ul>
                        {#each project.links as link (link.href)}
                            <li>
                                <a
                                    class="inline-flex gap-md"
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <link.icon />
                                    {link.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>

                <div>
                    <h2 class="mb-lg text-lg font-medium">Technologies Used</h2>

                    <div class="flex flex-wrap gap-sm text-sm">
                        {#each project.technologies as tech (tech)}
                            <ChipSpan>{tech}</ChipSpan>
                        {/each}
                    </div>
                </div>
            </div>
        </FlyUp>

        <hr class="border-theme-bg-3" />

        <FlyUp settings={{ threshold: 0.1 }}>
            <pre class="font-sans text-wrap">{project.description}</pre>
        </FlyUp>
    </article>
</main>
