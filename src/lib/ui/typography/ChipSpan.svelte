<script lang="ts">
    import merge from '$lib/utils/class-merge'

    const { children, class: clazz = '', ...props } = $props()
</script>

<span
    {...props}
    class={merge('inline-block rounded-full bg-theme-bg-2 px-md py-xs', clazz)}
>
    {@render children()}
</span>
