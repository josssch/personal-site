<script lang="ts">
    import merge from '$lib/utils/class-merge'
    import Button from './Button.svelte'

    const { children, class: clazz = '', ...props } = $props()
</script>

<Button
    {...props}
    class={merge('justify-center rounded-full', clazz)}
>
    {@render children()}
</Button>
