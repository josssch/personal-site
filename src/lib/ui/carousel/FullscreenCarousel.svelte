<script
    lang="ts"
    module
>
    export interface ScreenState {
        currentIndex: number
        index: number
        isVisible: boolean
    }
</script>

<script
    lang="ts"
    generics="T = any"
>
    import type { Snippet } from 'svelte'

    import ArrowLeft from '@lucide/svelte/icons/arrow-left'
    import ArrowRight from '@lucide/svelte/icons/arrow-right'
    import { browser } from '$app/environment'
    import { onMount } from 'svelte'

    import merge from '$lib/utils/class-merge'
    import isEventSupported from '$lib/utils/is-event-supported'
    import scrollToWait from '$lib/utils/scroll-to-wait'
    import CircleButton from '../form/CircleButton.svelte'

    interface Props {
        class?: string
        translatePx?: number

        index?: number

        for: T[]
        builder: Snippet<[T, ScreenState]>
    }

    let {
        class: clazz = '',
        for: forArr,
        builder,
        index: currentIndex = $bindable(0),
        translatePx = 100,
    }: Props = $props()

    const isScrollEndSupported = browser && isEventSupported('onscrollend')

    let panel: HTMLDivElement
    const screenElements: HTMLElement[] = $state([])

    onMount(() => navigateTo(currentIndex, { instant: true }))

    $effect(() => {
        // when the array this is based off changes
        void forArr

        // once the panel is mounted, update the clipping paths so that things display properly initially
        if (panel) updateClippingPaths()
    })

    let enableSnapping = true

    let lastScrollX = 0
    let lowDeltaCount = 0

    function onScroll() {
        updateClippingPaths()

        const panelWidth = panel.clientWidth
        const scrollX = panel.scrollLeft

        // this is to eagerly update the index value so that UI elements can respond
        // far quicker instead of having to wait for the scroll end to update
        currentIndex = Math.round(scrollX / panelWidth)

        // this is for Safari support
        if (isScrollEndSupported) {
            return
        }

        const LOW_DELTA_THRESHOLD = 5

        const deltaX = scrollX - lastScrollX
        lastScrollX = scrollX

        // this is an attempt to detect when the scrolling is slowing down
        // since on Safari, scrolling is smoothly eased out
        // this isn't a perfect solution but it works for now, this doesn't account for direction
        if (Math.abs(deltaX) > 2) {
            lowDeltaCount = 0
            return
        }

        lowDeltaCount++

        if (lowDeltaCount > LOW_DELTA_THRESHOLD) {
            lowDeltaCount = 0
            onScrollEnd()
        }
    }

    function onScrollEnd() {
        const panelWidth = panel.clientWidth
        const scrollX = panel.scrollLeft

        // this handles cases where the user scrolls too fast so the numbers are not accurate
        // on the last tick of the scroll event
        updateClippingPaths()

        // if the scroll is in a perfect position then we reset isNavigating
        if (scrollX % panelWidth === 0) {
            // update the current index here as well, since if someone flicks too fast
            // the navigateTo(...) snapping won't happen, causing an update to the index to be missed
            currentIndex = Math.round(scrollX / panelWidth)
            return
        }

        if (!enableSnapping) return

        // this is our own snapping behavior, since we can't rely on CSS snapping in this case
        navigateTo(Math.round(scrollX / panelWidth), {
            blockSnapping: false,
        })
    }

    export const navigateBy = (diff: number) => navigateTo(currentIndex + diff)

    export function navigateTo(index: number, { blockSnapping = true, instant = false } = {}) {
        if (!panel) return

        const panelWidth = panel.clientWidth

        // this is mostly for handling when resize happens, since the width changes and we expect
        // a desync between the scroll left and the index, so correct it with no animation
        if (instant) {
            panel.scrollTo({ left: currentIndex * panelWidth, behavior: 'instant' })
            updateClippingPaths()
            return
        }

        if (index < 0) {
            index = 0
        } else if (index >= forArr.length) {
            index = forArr.length - 1
        }

        currentIndex = index

        if (blockSnapping) enableSnapping = false

        scrollToWait(panel, {
            left: currentIndex * panelWidth,
            behavior: 'smooth',
        }).then(() => {
            // reset the snapping state after the scroll completes
            enableSnapping = true
        })
    }

    const updateClippingPaths = () =>
        requestAnimationFrame(() => {
            const panelWidth = panel.clientWidth
            const scrollX = panel.scrollLeft

            const index = Math.floor(scrollX / panelWidth)

            // the progress is the fraction of the panel that has been scrolled past
            const progress = scrollX / panelWidth - index
            const uProgress = 1 - progress

            const currentEl = screenElements[index]
            const nextEl = screenElements[index + 1]

            // for all of the remaining elements we will change their visibility to hidden and make it
            // so they cannot be interacted with, this should fix some visual issues, especially in cases
            // where carousel screens do not have a background
            for (const el of screenElements) {
                // for our currentEl and nextEl we will remove these styles
                if (el === currentEl || el === nextEl) {
                    el.style.removeProperty('visibility')
                    el.style.removeProperty('pointer-events') // gross that it's different
                    continue
                }

                el.style.visibility = 'hidden'
                el.style.pointerEvents = 'none'
            }

            if (currentEl != null) {
                currentEl.style.clipPath = `rect(0 calc(${uProgress * 100}% + ${translatePx}px) 100% 0)`
                currentEl.style.transform = `translateX(${progress * -translatePx}px)`
            }

            if (nextEl != null) {
                // clipping is required in the case there's no background
                nextEl.style.clipPath = `rect(0 100% 100% calc(${uProgress * 100}% - ${translatePx}px))`
                nextEl.style.transform = `translateX(${uProgress * translatePx}px)`
            }
        })

    const NAV_BUTTON_STYLES =
        'transition group-hover:translate-y-0 group-hover:opacity-100 sm:size-8 sm:translate-y-1/2 sm:opacity-0'
</script>

<svelte:window onresize={() => navigateTo(currentIndex, { instant: true })} />

<div
    bind:this={panel}
    onscroll={onScroll}
    onscrollend={onScrollEnd}
    style="--count: {forArr.length}; --current-index: {currentIndex};"
    class={merge('size-full overflow-x-scroll overflow-y-hidden', clazz)}
>
    <!-- this layer is responsible for the actual width of the carousel -->
    <div class="h-full w-[calc(var(--count)_*_100%)]">
        <!-- this layer is here to keep all elements in the same place regardless of the scroll position -->
        <div class="sticky left-0 h-full w-[calc(100%_/_var(--count))]">
            <!-- <h1 class="center-x absolute">{currentIndex}</h1> -->

            {#each forArr as item, i (i)}
                {@const state = {
                    currentIndex,
                    index: i,
                    isVisible: i === currentIndex,
                } satisfies ScreenState}

                <!-- render each screen in a wrapper element where everything is invisible by default -->
                <div
                    bind:this={screenElements[i]}
                    data-item-index={i}
                    style="--index: {i}; visibility: hidden;"
                    class="absolute size-full"
                >
                    {@render builder(item, state)}
                </div>
            {/each}

            <div
                class="group absolute bottom-lg center-x z-1 flex items-center gap-md opacity-50 transition-opacity hover:opacity-100 sm:-mt-xl sm:pt-xl"
            >
                <CircleButton
                    aria-label="Go Back"
                    class="mr-lg {NAV_BUTTON_STYLES}"
                    onclick={() => navigateTo(currentIndex - 1)}
                >
                    <ArrowLeft />
                </CircleButton>

                {#each forArr as _, i (i)}
                    <button
                        onclick={() => navigateTo(i)}
                        aria-label="Go to Screen {i}"
                        class="rounded-full bg-theme-on-bg transition-all group-hover:translate-y-0 group-hover:scale-100 sm:translate-y-sm sm:scale-75
                        {i === currentIndex ? 'size-2' : 'size-1.5 opacity-50'}"
                    ></button>
                {/each}

                <CircleButton
                    aria-label="Go Forward"
                    class="ml-lg {NAV_BUTTON_STYLES}"
                    onclick={() => navigateTo(currentIndex + 1)}
                >
                    <ArrowRight />
                </CircleButton>
            </div>
        </div>
    </div>
</div>
