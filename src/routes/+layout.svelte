<script lang="ts">
    import { page } from '$app/state'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'

    import Signature from '$lib/ui/branding/Signature.svelte'
    import Center from '$lib/ui/layout/Center.svelte'
    import NavBar, { SIGNATURE_NAV_KEY } from '$lib/ui/layout/NavBar.svelte'

    import '../tailwind.css'

    let { children } = $props()

    const firstLoadMs = Date.now()
    let isLoading = $state(true)

    onMount(() => {
        const loadTimeMs = Date.now() - firstLoadMs

        setTimeout(
            () => (isLoading = false),
            // adds a minimum delay of 500ms to the page so the splashscreen
            // doesn't feel too quick for some people
            // FIXME: make it so people who have been here in the same session have no delay
            Math.max(0, 500 - loadTimeMs),
        )
    })
</script>

{#if isLoading}
    <!--
        make this absolute so that this doesn't get in the way of the content
        while it's transitioning
    -->
    <div
        class="fixed inset-0 z-10 bg-theme-bg"
        out:fade
    >
        <Center class="animate-pulse p-xl sm:p-2xl">
            <Signature
                crossfadeKey={SIGNATURE_NAV_KEY}
                class="w-full max-w-64"
            />
        </Center>
    </div>
{:else}
    <div class="size-full">
        <NavBar
            items={[
                { href: '/', label: 'Projects' },
                { href: '/contact', label: 'Services' },
                { href: '/about', label: 'About' },
            ]}
        />

        {#key page.route.id}
            <div class="absolute size-full">
                {@render children()}
            </div>
        {/key}
    </div>
{/if}
