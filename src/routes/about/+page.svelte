<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'

    import { page } from '$app/state'
    import { onMount } from 'svelte'

    import { education } from '$lib/data/education'
    import { socialLinks } from '$lib/data/social-links'
    import { experience } from '$lib/data/work-experience'
    import BlurDown from '$lib/ui/animators/BlurDown.svelte'
    import SlideInText from '$lib/ui/animators/SlideInText.svelte'
    import Signature from '$lib/ui/branding/Signature.svelte'
    import InfoCard from '$lib/ui/components/InfoCard.svelte'
    import TableOfContents from '$lib/ui/components/TableOfContents.svelte'
    import FancyLink from '$lib/ui/typography/FancyLink.svelte'
    import Markdown from '$lib/ui/typography/Markdown.svelte'
    import scrollToElement from '$lib/utils/scroll-to-element'
    import toHash from '$lib/utils/to-hash'

    const headings: HeadingEntry[] = [
        { id: 'greeting', label: 'Introduction' },

        { id: 'experience', label: 'Experience' },
        ...experience.map(entry => ({
            id: toHash(entry.startedOn),
            label: entry.industry || entry.company || '',
            indent: 1,
        })),

        { id: 'education', label: 'Education' },
        ...education.map(entry => ({
            id: toHash(entry.type),
            label: entry.certification,
            indent: 1,
        })),
    ]

    // this is to enable hashes in the URL to scroll to the corresponding section
    // which typically breaks when using frameworks like SvelteKit
    onMount(() => {
        const hash = page.url.hash
        if (!hash) return

        const element = document.getElementById(hash.slice(1))
        if (element) scrollToElement(element, { behavior: 'instant' })
    })
</script>

<main class="main relative bg-theme-bg text-theme-on-bg">
    <div class="flex justify-center gap-xl max-md:flex-col">
        <BlurDown settings={{ delayMs: 400 }}>
            <aside class="top-3xl flex h-min px-lg md:sticky md:justify-end">
                <TableOfContents
                    class="w-full max-md:max-h-1/2 md:min-w-72"
                    {headings}
                />
            </aside>
        </BlurDown>

        <article class="main__article max-md:mx-auto">
            <Markdown>
                <BlurDown settings={{ delayMs: 50 }}>
                    <h1
                        id="greeting"
                        class="mb-[unset]"
                    >
                        Hello, I'm Josh 👋
                    </h1>
                </BlurDown>

                <ul class="not-prose my-xl flex flex-wrap items-center justify-evenly gap-lg">
                    {#each Object.values(socialLinks) as link, i (link.href)}
                        <li>
                            <SlideInText settings={{ delayMs: 250 + i * 100 }}>
                                <FancyLink {link} />
                            </SlideInText>
                        </li>
                    {/each}
                </ul>

                <BlurDown settings={{ delayMs: 100 }}>
                    <p>
                        I’m a <strong>software engineer</strong> based in 🇨🇦 Canada, with experience across
                        the software, insurance, and retail industries.
                    </p>

                    <p>
                        I build automation, data pipelines, and business intelligence tools that
                        make day-to-day work easier. I start by talking with the people who'll use
                        them, understanding how they work and exactly what slows things down.
                    </p>

                    <p>
                        I enjoy automating repetitive tasks so we can spend more time on the things
                        that matter most.
                    </p>

                    <hr />
                </BlurDown>

                <BlurDown settings={{ delayMs: 150 }}>
                    <h2
                        id="experience"
                        class="mt-[unset] mb-[unset]"
                    >
                        Professional Experience
                    </h2>
                </BlurDown>

                <div class="not-prose mt-lg flex flex-col gap-lg">
                    {#each experience as exp, i (exp)}
                        <BlurDown settings={{ delayMs: 200 + i * 50 }}>
                            <InfoCard
                                id={toHash(exp.startedOn)}
                                leadIn={exp.industry || exp.company}
                                title={exp.title}
                                points={exp.duties}
                                startedOn={exp.startedOn}
                                endedOn={exp.endedOn}
                                current={exp.isCurrent}
                            />
                        </BlurDown>
                    {/each}
                </div>

                <hr />

                <BlurDown settings={{ delayMs: 100 }}>
                    <h2
                        id="education"
                        class="mt-[unset] mb-[unset]"
                    >
                        Education & Certifications
                    </h2>
                </BlurDown>

                <div class="not-prose mt-lg flex flex-col gap-lg">
                    {#each education as edu (edu)}
                        <BlurDown>
                            <InfoCard
                                id={toHash(edu.type)}
                                leadIn={edu.type}
                                title={edu.certification}
                                startedOn={edu.startedOn}
                                endedOn={edu.endedOn}
                                current={edu.isCurrent}
                                points={edu.achievements}
                            />
                        </BlurDown>
                    {/each}
                </div>

                <hr />

                <Signature class="ml-auto w-42" />
            </Markdown>
        </article>
    </div>
</main>
