<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements'

    import merge from '$lib/utils/class-merge'

    interface Props extends HTMLAttributes<HTMLDivElement> {
        stepCount?: number
        direction?: 'up' | 'down'
        blurPx?: number
    }

    let { stepCount = 5, direction = 'up', blurPx = 2, class: clazz, ...props }: Props = $props()

    const stepPercent = $derived(100 / stepCount)
</script>

<div
    role="presentation"
    {...props}
    class={merge('pointer-events-none absolute inset-0 -z-1', clazz)}
>
    {#each Array(stepCount) as _, i}
        {@const step = i + 1}

        <!-- Solution inspired by: https://codepen.io/kennethnym/pen/eYqyRjQ -->
        <div
            role="presentation"
            style="
                --step: {direction === 'up' ? stepCount - step : step};
                --blur-amount: {blurPx}px;
                mask: linear-gradient(
                    {direction === 'up' ? 'black' : 'transparent'} {stepPercent * step}%,
                    {direction === 'up' ? 'transparent' : 'black'}
                        {Math.min(stepPercent * step + stepPercent * 1.25, 100)}%
                );
            "
            class="absolute inset-0 backdrop-blur-[calc(var(--step)*var(--blur-amount))]"
        ></div>
    {/each}
</div>
