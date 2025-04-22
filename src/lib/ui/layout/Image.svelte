<script lang="ts">
    import type { EventHandler } from 'svelte/elements'

    import merge from '$lib/utils/class-merge'

    const {
        src,
        alt,
        loading = 'lazy' as 'eager' | 'lazy',
        class: clazz = '',
        onload = null as EventHandler | null,
        onerror = null as EventHandler | null,
        ...props
    } = $props()

    let isLoading = $state(true)
</script>

<img
    {...props}
    class={merge(isLoading && 'animate-pulse text-current/0', 'bg-theme-bg-1', clazz)}
    onload={event => {
        isLoading = false
        onload?.(event)
    }}
    onerror={event => {
        isLoading = false
        onerror?.(event)
    }}
    {loading}
    {src}
    {alt}
/>
