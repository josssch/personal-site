<script lang="ts">
    import type { MetaTagsProps } from '$lib/types/meta-tags'

    import { page } from '$app/state'
    import { onMount } from 'svelte'
    import { blur } from 'svelte/transition'

    import { DEFAULT_META_TAGS } from '$lib/data/default-meta'
    import Signature from '$lib/ui/branding/Signature.svelte'
    import Center from '$lib/ui/layout/Center.svelte'
    import MetaTags from '$lib/ui/layout/MetaTags.svelte'
    import NavBar, { SIGNATURE_NAV_KEY } from '$lib/ui/layout/NavBar.svelte'

    import '../tailwind.css'

    let { children } = $props()

    const MIN_LOAD_TIME_MS = 1_000
    const firstLoadMs = Date.now()

    let isLoading = $state(true)

    onMount(() => {
        const loadTimeMs = Date.now() - firstLoadMs

        setTimeout(
            () => (isLoading = false),
            // adds a minimum delay to the page so the splashscreen
            // doesn't feel too quick for some people
            // FIXME: make it so people who have been here in the same session have no delay
            Math.max(0, MIN_LOAD_TIME_MS - loadTimeMs),
        )
    })

    const meta: MetaTagsProps = $derived(page.data.meta ? page.data.meta : {})
</script>

<MetaTags
    {...DEFAULT_META_TAGS}
    {...meta}
/>

{#if isLoading}
    <!--
        make this absolute so that this doesn't get in the way of the content
        while it's transitioning
    -->
    <div
        class="fixed inset-0 z-10 bg-theme-bg"
        out:blur
    >
        <Center class="p-xl sm:p-2xl">
            <div class="relative">
                <Signature
                    crossfadeKey={SIGNATURE_NAV_KEY}
                    class="w-full max-w-64 animate-pulse"
                />

                <span class="absolute right-lg bottom-lg font-medium">Software Engineer</span>
            </div>

            <!-- some text to let people know that the site isn't frozen after 5 seconds -->
            <span class="delayed-fade-in absolute bottom-lg center-x text-theme-on-bg-faint">
                Just a moment...
            </span>
        </Center>
    </div>
{:else}
    <div class="size-full">
        <NavBar
            items={[
                { href: '/', label: 'Projects' },
                { href: '/tutoring', label: 'Tutoring' },
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

<style>
    .delayed-fade-in {
        opacity: 0;
        animation: fade-in 0.5s ease-in-out 5s forwards;
    }

    @keyframes fade-in {
        to {
            opacity: 1;
        }
    }
</style>
