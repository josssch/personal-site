<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'
    import type { HTMLAttributes } from 'svelte/elements'

    import ChevronRight from '@lucide/svelte/icons/chevron-right'
    import Hash from '@lucide/svelte/icons/hash'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'

    import merge from '$lib/utils/class-merge'
    import scrollToElement from '$lib/utils/scroll-to-element'
    import SlideInText from '../animators/SlideInText.svelte'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        headings: HeadingEntry[]
        class?: string
        expanded?: boolean
    }

    let {
        headings,
        class: clazz = '',
        // default expanded to true on small screens (40rem is what Tailwind's `sm:` variant uses)
        expanded = $bindable(window && !window.matchMedia('(max-width: 40rem)').matches),
        ...props
    }: Props = $props()

    let currentIndex = $state(0)

    // make sure this is getting called when the component mounts
    onMount(update)

    // keep a list of the elements related to our headings and update the list
    // whenever the `headings` prop changes, which is done with the $derived
    let elements: (HTMLElement | null)[] = []
    let isOutdated = $derived(true || headings)

    function update() {
        if (isOutdated) {
            elements = headings.map(h => document.getElementById(h.id))
            isOutdated = false
        }

        // finding the closest heading element to the top of the viewport
        // and considering that to be our current heading
        let closestDistance = Infinity
        let closestEl: number | undefined

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i]

            if (!el) continue

            const top = Math.abs(el.getBoundingClientRect().top)

            if (top < closestDistance) {
                closestDistance = top
                closestEl = i
            }
        }

        if (closestEl != null) {
            currentIndex = closestEl
        }
    }

    function scrollTo(heading: string) {
        const el = document.getElementById(heading)
        if (!el) return
        scrollToElement(el)
    }
</script>

<svelte:window
    onresize={update}
    onscroll={update}
/>

<div
    {...props}
    class={merge('inline-block rounded-2xl bg-theme-bg-1 p-lg shadow-md', clazz)}
>
    <button
        type="button"
        aria-label="Expand"
        class="flex w-full justify-between"
        onclick={() => (expanded = !expanded)}
    >
        <h3 class="mb-md text-lg font-bold">
            <SlideInText>
                <Hash
                    class="mb-0.5 inline text-theme-on-bg-faint"
                    aria-hidden="true"
                />
                Overview
            </SlideInText>
        </h3>

        <ChevronRight class="text-lg transition-transform {expanded ? 'rotate-90' : ''}" />
    </button>

    <ul
        class={[
            'relative transition-[max-height,margin]',
            expanded ? 'max-h-[75vh] overflow-y-auto' : '-mt-md max-h-0 overflow-y-hidden',
        ]}
    >
        <div
            style="--nearest-index: {currentIndex};"
            class="absolute z-1 h-[calc(--spacing(2)+1.5em)] w-[2px] translate-y-[calc(100%_*_var(--nearest-index))] bg-theme-on-bg-em transition-transform duration-300"
        ></div>

        {#each headings as heading, i (heading.id)}
            {@const isCurrent = currentIndex === i}

            <SlideInText settings={{ delayMs: 100 }}>
                <li
                    style="--ident-by: {heading.indent ?? 0}em;"
                    class="relative py-sm pl-lg indent-(--ident-by) text-nowrap transition-colors before:absolute before:top-0 before:left-0.5 before:h-full before:w-[1px]
                    before:bg-theme-on-bg-faint supports-variable-font:transition-[color,font-weight]
                    {isCurrent
                        ? 'font-medium text-theme-on-bg-em'
                        : 'font-light text-theme-on-bg-faint'}"
                >
                    <a
                        onclick={e => {
                            e.preventDefault()
                            scrollTo(heading.id)
                            // using this rather than goto to avoid triggering svelte things
                            window.history.replaceState(null, '', `#${heading.id}`)
                        }}
                        href="#{heading.id}">{heading.label}</a
                    >
                </li>
            </SlideInText>
        {/each}
    </ul>
</div>
