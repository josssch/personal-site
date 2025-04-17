<script lang="ts">
    import merge from '$lib/utils/class-merge'

    const {
        children,
        type = 'button' as 'button' | 'submit' | 'reset',
        href = null as string | null,
        class: clazz = '',
        ...props
    } = $props()

    const isAnchor = $derived(href !== null)
    const ANCHOR_SPECIFIC_TAGS = { target: '_blank', rel: 'noopener noreferrer' }
</script>

<svelte:element
    this={isAnchor ? 'a' : 'button'}
    {...props}
    {...isAnchor ? ANCHOR_SPECIFIC_TAGS : {}}
    {href}
    {type}
    class={merge(
        'inline-flex items-center justify-center gap-md rounded-2xl bg-theme-bg-2 p-md text-center shadow-lg transition duration-300 hover:bg-theme-bg-3 active:translate-y-0.5 active:shadow-md active:duration-0',
        clazz,
    )}
>
    {@render children()}
</svelte:element>
