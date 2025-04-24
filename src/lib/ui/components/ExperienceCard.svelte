<script lang="ts">
    import type { WorkExperience } from '$lib/types/work-experience'
    import type { HTMLAttributes } from 'svelte/elements'

    import History from '@lucide/svelte/icons/history'

    import merge from '$lib/utils/class-merge'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        experience: WorkExperience
        open?: boolean
        class?: string
    }

    const { experience, class: clazz = '', open = $bindable(false), ...props }: Props = $props()
</script>

<div
    {...props}
    class={merge('rounded-2xl bg-theme-bg-1 p-lg shadow-md', clazz)}
>
    <div>{experience.company || experience.industry}</div>

    <h2 class="text-lg font-semibold text-theme-on-bg-em">
        {experience.title}
    </h2>

    <p class="text-sm leading-base font-light text-theme-on-bg-faint">
        {#if !experience.endedOn}
            <!-- add a history icon flipped around to indicate "going forward" -->
            <History class="inline size-4 -scale-x-100" />
        {/if}

        {experience.startedOn}
        &mdash;

        {#if experience.endedOn}
            {experience.endedOn}
        {:else}
            <b>Present</b>
        {/if}
    </p>

    <ul class="mt-lg list-disc overflow-hidden pl-lg">
        {#each experience.duties as duty, i (i)}
            <li class="not-last:mb-md marker:text-theme-on-bg-faint">{duty}</li>
        {/each}
    </ul>
</div>
