<script
    lang="ts"
    module
>
    export const SIGNATURE_NAV_KEY = 'nav'
</script>

<script lang="ts">
    import type { NavBarItem } from '$lib/types/nav-item'

    import Menu from '@lucide/svelte/icons/menu'
    import X from '@lucide/svelte/icons/x'
    import { browser } from '$app/environment'
    import { page } from '$app/state'

    import SlideInText from '../animators/SlideInText.svelte'
    import Signature from '../branding/Signature.svelte'
    import GradualBackdropBlur from './GradualBackdropBlur.svelte'

    const { items = [] as NavBarItem[] } = $props()
    const itemPlayers: SlideInText[] = $derived(new Array(items.length).fill(null))

    let scrollY = $state(browser ? window.scrollY : 0)
    let innerWidth = $state(browser ? window.innerWidth : 0)

    const isScrolled = $derived(scrollY > 0)

    let trueExpandedHeight = $state(0)
    let isExpanded = $state(false)

    $effect(() => {
        // when the scroll height changes, or the window width changes
        ;(void scrollY, innerWidth)
        isExpanded = false
    })

    $effect(() => {
        // this will be triggered when isExpanded changes and onMount,
        // when the window size is greater than 40rem (`sm`), onMount this will trigger an
        // automatic playing of all navigation items because they'll be visible
        itemPlayers.forEach(player => {
            if (isExpanded || window.matchMedia('(min-width: 40rem)').matches) {
                player.play()
            } else {
                player.reset()
            }
        })
    })

    function onToggleExpand(event: MouseEvent) {
        // stop propagation to prevent the window click handler from being triggered
        event.stopPropagation()
        isExpanded = !isExpanded
    }
</script>

<!--
    the onclick being handled this way means we get automatic closing for free when the user
    navigates or interacts with anything else, which presumably means they're done interacting with
    the nav
-->
<svelte:window
    onclick={() => (isExpanded = false)}
    bind:scrollY
    bind:innerWidth
/>

<nav class="fixed z-100 w-full transition">
    <GradualBackdropBlur
        class="h-[125%] bg-linear-to-t from-transparent to-theme-bg transition-opacity transition-discrete sm:h-[115%]
        {isExpanded || isScrolled ? 'opacity-100' : 'hidden opacity-0'}"
    />

    <div
        class="container mx-auto flex flex-wrap items-center px-xl pb-lg transition-[padding,opacity] ease-out hover:opacity-100 sm:opacity-75
        {isScrolled ? 'pt-lg' : 'pt-lg sm:pt-xl'}"
    >
        <a
            href="/"
            class="mr-auto"
        >
            <!-- opacity-100! is to prevent it from being transparent at any point during the crossfade -->
            <Signature
                crossfadeKey={SIGNATURE_NAV_KEY}
                class="w-24 opacity-100! sm:w-32"
            />
        </a>

        <button
            class="relative -m-xl p-xl sm:hidden"
            onclick={onToggleExpand}
        >
            {#if isExpanded}
                <X />
            {:else}
                <Menu />
            {/if}
        </button>

        <div
            {@attach div => {
                trueExpandedHeight = div.scrollHeight
            }}
            style="--true-height: {trueExpandedHeight}px;"
            class="overflow-hidden max-sm:w-full
            {isExpanded
                ? 'visible transition-[max-height] transition-discrete max-sm:max-h-(--true-height)'
                : 'max-sm:invisible max-sm:max-h-0'}"
        >
            <div class="flex items-center gap-xl max-sm:mt-lg max-sm:flex-col sm:gap-2xl">
                {#each items as item, i (item.href)}
                    {@const isCurrent = page.url.pathname === item.href}

                    <SlideInText
                        bind:this={itemPlayers[i]}
                        settings={{ delayMs: i * 150, trigger: 'manual' }}
                    >
                        <a
                            class="supports-variable-font:transition-[background-color,color,font-weight rounded-lg px-md py-sm transition-colors
                            {isCurrent
                                ? 'font-medium text-theme-on-bg-em'
                                : 'font-light text-theme-on-bg hover:bg-theme-bg-2'}"
                            href={item.href}
                            title={isCurrent ? 'Current Page' : ''}
                        >
                            {item.label}
                        </a>
                    </SlideInText>
                {/each}
            </div>
        </div>
    </div>
</nav>
