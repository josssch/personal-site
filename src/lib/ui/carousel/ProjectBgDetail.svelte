<script lang="ts">
    import type { Snippet } from 'svelte'

    import merge from '$lib/utils/class-merge'

    let { class: clazz = '', children }: { class?: string; children?: Snippet } = $props()
</script>

<div class={merge('pointer-events-none absolute inset-0 overflow-hidden', clazz)}>
    {@render children?.()}
</div>
