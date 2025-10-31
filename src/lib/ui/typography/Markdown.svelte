<script>
    import merge from '$lib/utils/class-merge'

    const { class: clazz = '', children, ...props } = $props()
</script>

<div
    {...props}
    class={merge('prose max-w-[unset] prose-h1:font-bold prose-li:my-0', clazz)}
>
    {@render children?.()}
</div>
