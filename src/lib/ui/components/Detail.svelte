<script lang="ts">
    import type { Snippet } from 'svelte'

    interface Props {
        title: string
        class?: string
        children?: Snippet
    }

    const { title, class: clazz = '', children }: Props = $props()
</script>

<div class={clazz}>
    <h2 class="mb-lg text-sm font-medium text-theme-on-bg-faint">{title.toUpperCase()}</h2>

    {@render children?.()}
</div>
