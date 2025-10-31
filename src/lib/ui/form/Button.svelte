<script lang="ts">
    import merge from '$lib/utils/class-merge'

    const {
        children,
        type = 'button' as 'button' | 'submit' | 'reset',
        href = null as string | null,
        openInNewTab = href != null && href.startsWith('http'),
        class: clazz = '',
        ...props
    } = $props()

    const isAnchor = $derived(href !== null)
    const ANCHOR_SPECIFIC_TAGS = $derived({
        // undefined because _self overrides svelte routing
        target: openInNewTab ? '_blank' : undefined,
        rel: 'noopener noreferrer',
    })
</script>

<svelte:element
    this={isAnchor ? 'a' : 'button'}
    {...isAnchor ? ANCHOR_SPECIFIC_TAGS : {}}
    {href}
    {type}
    {...props}
    class={merge(
        'inline-flex items-center justify-center gap-md rounded-2xl bg-theme-bg-2 px-lg py-md text-center text-theme-on-bg shadow-lg transition duration-300 hover:bg-theme-bg-3 active:translate-y-0.5 active:text-theme-on-bg-em active:shadow-md active:duration-0',
        clazz,
    )}
>
    {@render children()}
</svelte:element>
