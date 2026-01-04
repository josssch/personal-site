<script lang="ts">
    import type { Link } from '$lib/types/link'

    import merge from '$lib/utils/class-merge'

    const { link, class: clazz = '' }: { link: Link; class?: string } = $props()
</script>

<a
    class={merge(
        'inline-flex items-center gap-md underline-offset-4 focus-within:underline hover:underline',
        clazz,
    )}
    href={link.href}
    aria-label={link.label}
    target={!link.internal ? '_blank' : ''}
    rel="noopener noreferrer"
>
    <link.icon
        title={link.label}
        aria-hidden="true"
        class="size-(--icon-size,1.5em)"
        size="var(--icon-size, 1.5em)"
    />
    <span class="text-wrap">{link.label}</span>
</a>
