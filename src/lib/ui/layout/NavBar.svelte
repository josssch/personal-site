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
    import { slide } from 'svelte/transition'

    import Signature from '../branding/Signature.svelte'

    const { hidden = false, items = [] as NavBarItem[] } = $props()

    const currentRouteIndex = $derived(items.findIndex(i => i.href === page.url.pathname))
</script>

{#if !hidden}
    <nav
        class="absolute center-x z-100 container flex items-center gap-xl px-xl py-lg transition ease-out hover:opacity-100 sm:gap-2xl sm:p-xl sm:opacity-50"
    >
        <Signature class="mr-auto w-24 sm:w-32" />

        {#each items as item, i (item.href)}
            <div class="overflow-hidden">
                <a
                    class="block"
                    href={item.href}
                    in:slide|global={{ delay: (items.length - i) * 250, axis: 'y' }}
                >
                    {item.label}
                </a>
            </div>
        {/each}
    </nav>
{/if}
