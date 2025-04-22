<script>
    import merge from '$lib/utils/class-merge'

    const { class: clazz = '', children, ...props } = $props()
</script>

<div
    {...props}
    class={merge('prose', clazz)}
>
    {@render children?.()}
</div>
