<script lang="ts">
    import type { Link } from '$lib/types/link'

    import merge from '$lib/utils/class-merge'
    import Button from '../form/Button.svelte'

    interface Props {
        links: Link[]
        firstIsPrimary?: boolean
        vertical?: boolean
        class?: string
    }

    const { links, firstIsPrimary = false, class: clazz = '' }: Props = $props()
</script>

<div class={merge('flex gap-md', clazz)}>
    {#each links as link (link.href)}
        {@const Icon = link.icon}

        <Button
            title={link.label}
            aria-label={link.label}
            class="min-w-12 {firstIsPrimary ? 'first:grow not-first:[&>span]:hidden' : ''}"
            href={link.href}
            target={link.internal ? '' : '_blank'}
        >
            <Icon
                title={link.label}
                aria-hidden="true"
            />
            <span>{link.label}</span>
        </Button>
    {/each}
</div>
