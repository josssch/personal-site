<script lang="ts">
    import type { HeadingEntry } from '$lib/types/toc-entry'
    import type { HTMLAttributes } from 'svelte/elements'

    import Hash from '@lucide/svelte/icons/hash'
    import { onMount } from 'svelte'

    import merge from '$lib/utils/class-merge'
    import SlideInText from '../animators/SlideInText.svelte'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        headings: HeadingEntry[]
        class?: string
    }

    const { headings, class: clazz = '', ...props }: Props = $props()

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
</script>

<svelte:window
    onresize={update}
    onscroll={update}
/>

<div
    {...props}
    class={merge('inline-block rounded-2xl bg-theme-bg-1 p-lg shadow-md', clazz)}
>
    <h3 class="mb-md font-semibold">
        <SlideInText>
            <Hash
                class="inline w-4 text-theme-on-bg-faint"
                aria-hidden="true"
            />
            On This Page
        </SlideInText>
    </h3>

    <ul class="relative">
        <div
            style="--nearest-index: {currentIndex};"
            class="absolute z-1 h-[calc(--spacing(2)+1.5em)] w-[2px] translate-y-[calc(100%_*_var(--nearest-index))] bg-theme-on-bg-em transition-transform duration-300"
        ></div>

        {#each headings as heading, i (heading.id)}
            {@const isCurrent = currentIndex === i}

            <SlideInText settings={{ delayMs: 100 }}>
                <li
                    style="--ident-by: {(heading.indent ?? 0) / 2}em;"
                    class="relative py-sm pl-lg indent-(--ident-by) text-nowrap transition-colors before:absolute before:top-0 before:left-0.5 before:h-full before:w-[1px]
                    before:bg-theme-on-bg-faint supports-variable-font:transition-[color,font-weight]
                    {isCurrent ? 'font-medium text-theme-on-bg-em' : ''}"
                >
                    <a href="#{heading.id}">{heading.label}</a>
                </li>
            </SlideInText>
        {/each}
    </ul>
</div>
