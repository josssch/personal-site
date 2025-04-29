<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'

    import { page } from '$app/state'
    import { onMount } from 'svelte'

    import { DEFAULT_META_TAGS } from '$lib/data/default-meta'
    import { education } from '$lib/data/education'
    import { socialLinks } from '$lib/data/social-links'
    import { experience } from '$lib/data/work-experience'
    import FlyUp from '$lib/ui/animators/FlyUp.svelte'
    import SlideInText from '$lib/ui/animators/SlideInText.svelte'
    import Signature from '$lib/ui/branding/Signature.svelte'
    import InfoCard from '$lib/ui/components/InfoCard.svelte'
    import TableOfContents from '$lib/ui/components/TableOfContents.svelte'
    import MetaTags from '$lib/ui/layout/MetaTags.svelte'
    import FancyLink from '$lib/ui/typography/FancyLink.svelte'
    import Markdown from '$lib/ui/typography/Markdown.svelte'
    import toHash from '$lib/utils/to-hash'

    const headings: HeadingEntry[] = [
        { id: 'greeting', label: 'Top' },

        { id: 'experience', label: 'Work History' },
        ...experience.map(entry => ({
            id: toHash(entry.startedOn),
            label: entry.title,
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
        element?.scrollIntoView()
    })
</script>

<!-- I could title it "About Me" but my name being in the title is enough -->
<MetaTags
    {...DEFAULT_META_TAGS}
    path="/about"
/>

<main class="main relative bg-theme-bg text-theme-on-bg">
    <div class="flex justify-center gap-xl max-md:flex-col">
        <aside class="top-3xl flex h-min px-lg md:sticky md:justify-end">
            <TableOfContents
                class="w-full max-md:max-h-1/2 md:min-w-72"
                {headings}
            />
        </aside>

        <article class="main__article max-md:mx-auto">
            <Markdown class="prose-h1:font-bold">
                <SlideInText settings={{ delayMs: 250 }}>
                    <h1
                        id="greeting"
                        class="mb-[unset]"
                    >
                        Hello, I'm Josh 👋
                    </h1>
                </SlideInText>

                <ul class="not-prose my-xl flex flex-wrap items-center justify-evenly gap-lg">
                    {#each socialLinks as link, i (link.href)}
                        <li>
                            <SlideInText settings={{ delayMs: i * 50 + 250 }}>
                                <FancyLink {link} />
                            </SlideInText>
                        </li>
                    {/each}
                </ul>

                <FlyUp>
                    <p>
                        I'm a full-stack software engineer with experience in the insurance and
                        retail industries. As of late, my focus has been on system-level application
                        and service development.
                    </p>

                    <p>
                        Currently working as a <strong>System Administrator</strong>, managing
                        server infrastructure and develop custom automation software. In this
                        role—and in previous positions—my focus has been on optimizing workflows and
                        reducing man-hours through developing and maintaining specialized software
                        solutions.
                    </p>
                </FlyUp>

                <hr />

                <SlideInText settings={{ delayMs: 100 }}>
                    <h2
                        id="experience"
                        class="mt-[unset] mb-[unset]"
                    >
                        Work History
                    </h2>
                </SlideInText>

                <div class="not-prose mt-lg flex flex-col gap-lg">
                    {#each experience as exp (exp)}
                        <FlyUp>
                            <InfoCard
                                id={toHash(exp.startedOn)}
                                leadIn={exp.industry || exp.company}
                                title={exp.title}
                                points={exp.duties}
                                startedOn={exp.startedOn}
                                endedOn={exp.endedOn}
                                current={exp.isCurrent}
                            />
                        </FlyUp>
                    {/each}
                </div>

                <hr />

                <SlideInText settings={{ delayMs: 100 }}>
                    <h2
                        id="education"
                        class="mt-[unset] mb-[unset]"
                    >
                        Education & Certifications
                    </h2>
                </SlideInText>

                <div class="not-prose mt-lg flex flex-col gap-lg">
                    {#each education as edu (edu)}
                        <FlyUp>
                            <InfoCard
                                id={toHash(edu.type)}
                                leadIn={edu.type}
                                title={edu.certification}
                                startedOn={edu.startedOn}
                                endedOn={edu.endedOn}
                                current={edu.isCurrent}
                            />
                        </FlyUp>
                    {/each}
                </div>

                <hr />

                <Signature class="ml-auto w-42" />
            </Markdown>
        </article>
    </div>
</main>
