<script>
    import merge from '$lib/utils/class-merge'

    const { children, class: clazz = '', ...props } = $props()
</script>

<div
    class={merge('flex size-full items-center justify-center', clazz)}
    {...props}
>
    {@render children?.()}
</div>
