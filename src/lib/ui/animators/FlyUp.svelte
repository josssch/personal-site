<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { AnimationSettings, ControllerElement } from './animation.svelte'

    import { animateController, DEFAULT_ANIMATION_SETTINGS } from './animation.svelte'

    const {
        children,
        settings = DEFAULT_ANIMATION_SETTINGS,
    }: { children: Snippet; settings?: Partial<AnimationSettings> } = $props()

    const animation = $derived({ ...DEFAULT_ANIMATION_SETTINGS, ...settings })

    let controller: ControllerElement
    export const play = () => controller.play?.()
    export const reset = () => controller.reset?.()
</script>

<div
    use:animateController={{ animation, keyframes: 'fly-in' }}
    bind:this={controller}
    class="not-motion-reduce:translate-y-4 not-motion-reduce:opacity-0"
>
    {@render children()}
</div>

<style>
    @keyframes -global-fly-in {
        to {
            opacity: 1;
            translate: 0 0;
        }
    }
</style>
