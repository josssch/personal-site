<script lang="ts">
    import { blur } from 'svelte/transition'

    import Signature from '$lib/ui/branding/Signature.svelte'
    import Center from '$lib/ui/layout/Center.svelte'
    import NavBar from '$lib/ui/layout/NavBar.svelte'

    import '../tailwind.css'

    let { children } = $props()

    let isLoading = $state(true)
    let hideNav = $state(true)

    $effect(() => {
        isLoading = false
    })
</script>

{#if isLoading}
    <div
        class="size-full"
        out:blur={{ duration: 500 }}
    >
        <Center class="animate-pulse p-xl sm:p-2xl">
            <Signature class="w-full max-w-64" />
        </Center>
    </div>
{:else}
    <div
        class="size-full"
        in:blur={{ delay: 500, duration: 500 }}
        onintroend={() => (hideNav = false)}
    >
        <NavBar
            hidden={hideNav}
            items={[
                { href: '/', label: 'Projects' },
                { href: '/contact', label: 'Services' },
                { href: '/about', label: 'About' },
            ]}
        />

        {@render children()}
    </div>
{/if}
