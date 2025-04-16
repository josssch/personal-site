<script>
    import merge from '$lib/utils/class-merge'

    const { class: clazz = '', children, ...props } = $props()
</script>

<div
    {...props}
    class={merge('prose prose-neutral prose-invert', clazz)}
>
    {@render children?.()}
</div>
