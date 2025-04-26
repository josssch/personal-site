<script lang="ts">
    import merge from '$lib/utils/class-merge'

    const { class: clazz = '', children, ...props } = $props()
</script>

<div class={merge('grid gap-xl sm:grid-cols-2', clazz)}>
    {@render children()}
</div>
