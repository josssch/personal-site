<script lang="ts">
    import merge from '$lib/utils/class-merge'

    const {
        children,
        type = 'button' as 'button' | 'submit' | 'reset',
        href = null as string | null,
        class: clazz = '',
        ...props
    } = $props()
</script>

<svelte:element
    this={href ? 'a' : 'button'}
    {...props}
    {href}
    {type}
    class={merge(
        'inline-flex items-center justify-center gap-md rounded-2xl bg-neutral-800 p-md text-center shadow-lg transition duration-300 hover:bg-neutral-700 active:translate-y-0.5 active:shadow-md active:duration-0',
        clazz,
    )}
>
    {@render children()}
</svelte:element>
