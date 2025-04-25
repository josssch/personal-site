<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    import History from '@lucide/svelte/icons/history'

    import merge from '$lib/utils/class-merge'

    interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
        leadIn?: Snippet | string
        title: Snippet | string

        startedOn?: string
        endedOn?: string
        current?: boolean

        points?: string[]
    }

    const {
        leadIn,
        title,
        startedOn,
        endedOn,
        current = false,
        points = [],
        class: clazz = '',
        ...props
    }: Props = $props()
</script>

<div
    {...props}
    class={merge('rounded-2xl bg-theme-bg-1 p-lg shadow-md', clazz)}
>
    {#if leadIn}
        <div>
            {#if typeof leadIn === 'string'}
                {leadIn}
            {:else}
                {@render leadIn()}
            {/if}
        </div>
    {/if}

    <h2 class="text-lg font-semibold text-theme-on-bg-em">
        {#if typeof title === 'string'}
            {title}
        {:else}
            {@render title()}
        {/if}
    </h2>

    {#if startedOn || endedOn}
        <p class="text-sm leading-base font-light text-theme-on-bg-faint">
            {#if current}
                <!-- add a history icon flipped around to indicate "going forward" -->
                <History class="inline size-4 -scale-x-100" />
            {/if}

            {startedOn} &mdash;
            {#if endedOn}
                {endedOn}
            {:else}
                <b>Present</b>
            {/if}
        </p>
    {/if}

    <ul class="list-disc overflow-hidden pl-lg">
        {#each points as point, i (i)}
            <li class="not-last:mb-md marker:text-theme-on-bg-faint first:mt-lg">{point}</li>
        {/each}
    </ul>
</div>
