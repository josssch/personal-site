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

    import SlideInText from '../animators/SlideInText.svelte'
    import Signature from '../branding/Signature.svelte'

    const { hidden = false, items = [] as NavBarItem[] } = $props()
</script>

{#if !hidden}
    <nav
        class="absolute center-x z-100 container flex items-center gap-xl px-xl py-lg transition ease-out hover:opacity-100 sm:gap-2xl sm:p-xl sm:opacity-75"
    >
        <Signature class="mr-auto w-24 sm:w-32" />

        {#each items as item, i (item.href)}
            {@const isCurrent = page.url.pathname === item.href}

            <SlideInText delayMs={(items.length - i - 1) * 150}>
                <a
                    class="transition-colors
                    {isCurrent ? 'text-on-background-highlight' : 'font-light text-on-background'}"
                    href={item.href}
                >
                    {item.label}
                </a>
            </SlideInText>
        {/each}
    </nav>
{/if}
