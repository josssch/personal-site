<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'
    import type { HTMLAttributes } from 'svelte/elements'

    import ChevronRight from '@lucide/svelte/icons/chevron-right'
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
        class="flex w-full items-center justify-between"
        onclick={() => (expanded = !expanded)}
    >
        <h3 class="text-sm font-medium text-theme-on-bg-faint">
            <SlideInText>ON THIS PAGE</SlideInText>
        </h3>

        <ChevronRight class="text-lg transition-transform {expanded ? 'rotate-90' : ''}" />
    </button>

    <div
        class={[
            'group transition-[max-height,margin]',
            expanded ? 'max-h-[50vh] overflow-y-auto' : 'max-h-0 overflow-y-hidden',
        ]}
    >
        <ul class="relative mt-md">
            <div
                style="
                --top: {(currentIndex / headings.length) * 100}%;
                --left: {headings[currentIndex]?.indent ?? 0}em;
            "
                class="absolute top-(--top) left-(--left) z-1 size-1 translate-y-[0.5lh] bg-theme-on-bg transition-[top,left] duration-100"
            ></div>

            {#each headings as heading, i (heading.id)}
                {@const isCurrent = currentIndex === i}

                <SlideInText settings={{ delayMs: i * 25 + 100 }}>
                    <li
                        style="--ident-by: {heading.indent ?? 0}em;"
                        class="relative py-sm pl-lg indent-(--ident-by) leading-tight text-nowrap transition-colors supports-variable-font:transition-[color,font-weight,font-size]
                    {isCurrent ? 'text-theme-on-bg' : 'font-light text-theme-on-bg-faint'}"
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
</div>
