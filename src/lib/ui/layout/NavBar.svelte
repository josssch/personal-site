<script
    lang="ts"
    module
>
    export interface NavBarItem {
        label: string
        href: string
    }
</script>

<script lang="ts">
    import { page } from '$app/state'

    import FlyUp from '../animators/FlyUp.svelte'
    import SlideInText from '../animators/SlideInText.svelte'
    import Signature from '../branding/Signature.svelte'

    const { hidden = false, items = [] as NavBarItem[] } = $props()
</script>

{#if !hidden}
    <nav
        class="absolute center-x z-100 container flex items-center gap-xl px-xl py-lg transition ease-out hover:opacity-100 sm:gap-2xl sm:p-xl sm:opacity-75"
    >
        <div class="mr-auto">
            <FlyUp><Signature class="w-24 sm:w-32" /></FlyUp>
        </div>

        {#each items as item, i (item.href)}
            {@const isCurrent = page.url.pathname === item.href}

            <SlideInText settings={{ delayMs: (items.length - i - 1) * 150 }}>
                <a
                    class="transition-colors
                    {isCurrent ? 'text-theme-on-bg-em' : 'font-light text-theme-on-bg'}"
                    href={item.href}
                >
                    {item.label}
                </a>
            </SlideInText>
        {/each}
    </nav>
{/if}
