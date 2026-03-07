<script>
    import merge from '$lib/utils/class-merge'

    const { class: clazz = '', children, ...props } = $props()
</script>

<div
    {...props}
    class={merge(
        'prose max-w-[unset] prose-h1:font-bold prose-li:my-sm prose-li:prose-ul:my-md',
        clazz,
    )}
>
    {@render children?.()}
</div>
