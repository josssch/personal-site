<script
    lang="ts"
    module
>
    export const SIGNATURE_NAV_KEY = 'nav'
</script>

<script lang="ts">
    import type { NavBarItem } from '$lib/types/nav-item'

    import { browser } from '$app/environment'
    import { page } from '$app/state'

    import SlideInText from '../animators/SlideInText.svelte'
    import Signature from '../branding/Signature.svelte'

    const { items = [] as NavBarItem[] } = $props()

    let scrollY = $state(browser ? window.scrollY : 0)
    const isScrolled = $derived(scrollY > 0)
</script>

<svelte:window bind:scrollY />

<nav
    class="fixed z-100 w-full transition
    {isScrolled ? 'bg-theme-bg-1/33 shadow-sm backdrop-blur-lg' : ''}"
>
    <div
        class="container mx-auto flex items-center gap-xl px-xl pb-lg transition-[padding,opacity] ease-out hover:opacity-100 sm:gap-2xl sm:opacity-75
        {isScrolled ? 'pt-lg' : 'pt-lg not-motion-reduce:sm:pt-xl'}"
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

        {#each items as item, i (item.href)}
            {@const isCurrent = page.url.pathname === item.href}

            <SlideInText settings={{ delayMs: (items.length - i - 1) * 150, trigger: 'instant' }}>
                <a
                    class="rounded-lg px-md py-sm transition-colors
                    supports-variable-font:transition-[background-color,color,font-weight]
                    {isCurrent
                        ? 'text-theme-on-bg-em'
                        : 'font-light text-theme-on-bg hover:bg-theme-bg-2'}"
                    href={item.href}
                >
                    {item.label}
                </a>
            </SlideInText>
        {/each}
    </div>
</nav>
