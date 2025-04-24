<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'

    import { experience } from '$lib/data/work-experience'
    import FlyUp from '$lib/ui/animators/FlyUp.svelte'
    import SlideInText from '$lib/ui/animators/SlideInText.svelte'
    import Signature from '$lib/ui/branding/Signature.svelte'
    import ExperienceCard from '$lib/ui/components/ExperienceCard.svelte'
    import TableOfContents from '$lib/ui/components/TableOfContents.svelte'
    import Markdown from '$lib/ui/typography/Markdown.svelte'

    // convert the string to a valid hash for usage in a URL
    const toHash = (str: string) => encodeURIComponent(str.toLowerCase().replace(/\s+/g, '-'))

    const headings: HeadingEntry[] = [
        { id: 'greeting', label: 'Top' },
        { id: 'experience', label: 'Work History' },
        ...experience.map(entry => ({
            id: toHash(entry.startedOn),
            label: entry.title,
            indent: 1,
        })),
        { id: 'education', label: 'Education' },
    ]
</script>

<main class="main relative bg-theme-bg text-theme-on-bg">
    <div class="flex justify-center gap-xl max-md:flex-col">
        <aside class="top-3xl flex h-min px-lg md:sticky md:justify-end">
            <TableOfContents
                class="w-full md:min-w-72"
                {headings}
            />
        </aside>

        <article class="article max-md:mx-auto">
            <Markdown class="prose-h1:font-bold">
                <SlideInText settings={{ delayMs: 250 }}>
                    <h1
                        id="greeting"
                        class="mb-[unset]"
                    >
                        Hello, I'm Josh 👋
                    </h1>
                </SlideInText>

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
                            <ExperienceCard
                                id={toHash(exp.startedOn)}
                                experience={exp}
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
                        Education
                    </h2>
                </SlideInText>

                <div class="not-prose mt-lg flex flex-col gap-lg">
                    {#each experience as exp (exp)}
                        <FlyUp><ExperienceCard experience={exp} /></FlyUp>
                    {/each}
                </div>

                <hr />

                <Signature class="ml-auto w-42" />
            </Markdown>
        </article>
    </div>
</main>
