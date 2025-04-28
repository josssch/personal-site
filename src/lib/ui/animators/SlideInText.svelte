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
</script>

<span class="block overflow-hidden leading-normal">
    <span
        use:animateController={{ animation, keyframes: 'slide-in' }}
        bind:this={controller}
        class="inline-block not-motion-reduce:translate-y-full"
    >
        {@render children()}
    </span>
</span>

<style>
    @keyframes -global-slide-in {
        to {
            translate: 0 0;
        }
    }
</style>
