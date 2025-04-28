<script lang="ts">
    import type { Link } from '$lib/types/link'

    import merge from '$lib/utils/class-merge'

    const { link, class: clazz = '' }: { link: Link; class?: string } = $props()
</script>

<a
    class={merge('inline-flex gap-md focus-within:underline hover:underline', clazz)}
    href={link.href}
    aria-label={link.label}
    target={!link.internal ? '_blank' : ''}
    rel="noopener noreferrer"
>
    <link.icon
        title={link.label}
        aria-hidden="true"
    />
    <span class="text-wrap">{link.label}</span>
</a>
