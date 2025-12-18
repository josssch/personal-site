<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'

    import { page } from '$app/state'
    import { onMount } from 'svelte'

    import { education } from '$lib/data/education'
    import { socialLinks } from '$lib/data/social-links'
    import { experience } from '$lib/data/work-experience'
    import FlyUp from '$lib/ui/animators/FlyUp.svelte'
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

        { id: 'experience', label: 'Work History' },
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
        <aside class="top-3xl flex h-min px-lg md:sticky md:justify-end">
            <TableOfContents
                class="w-full max-md:max-h-1/2 md:min-w-72"
                {headings}
            />
        </aside>

        <article class="main__article max-md:mx-auto">
            <Markdown>
                <SlideInText settings={{ delayMs: 250 }}>
                    <h1
                        id="greeting"
                        class="mb-[unset]"
                    >
                        Hello, I'm Josh 👋
                    </h1>
                </SlideInText>

                <ul class="not-prose my-xl flex flex-wrap items-center justify-evenly gap-lg">
                    {#each Object.values(socialLinks) as link, i (link.href)}
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
                        retail industries. Lately, my focus has been on system-level application and
                        service development.
                    </p>

                    <p>
                        <strong>I build software that fits the way people work.</strong> My priority when
                        we work together is understanding and integrating with your workflow seamlessly.
                        That means taking the time to get it right, the way you want it.
                    </p>

                    <p class="text-(--tw-prose-bold)">
                        Get in touch if you need an independent developer to help refine your
                        workflow and build custom software that fits right in.
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
