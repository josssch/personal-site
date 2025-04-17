<script lang="ts">
    const {
        children,
        trigger = 'intersection' as 'now' | 'intersection' | 'manual',
        delayMs = 0,
    } = $props()

    let dispatched = $state(trigger === 'now')

    const observer = new IntersectionObserver((_, self) => {
        // stop wasting resources watching for intersections
        self.disconnect()

        dispatched = true
    })

    let textWrapperEl: HTMLSpanElement

    export function play() {
        if (!dispatched && trigger === 'manual') {
            dispatched = true
        }
    }

    $effect(() => {
        if (!dispatched && trigger === 'intersection') {
            observer.observe(textWrapperEl)
        }

        return () => observer.disconnect()
    })
</script>

<span class="block overflow-hidden leading-normal">
    <span
        bind:this={textWrapperEl}
        style="--delay: {delayMs}ms;"
        class={['slide-in-initial inline-block ', dispatched && 'slide-in']}
    >
        {@render children()}
    </span>
</span>

<style>
    .slide-in-initial {
        transform: translateY(100%);
    }

    .slide-in {
        animation: slide-in var(--default-transition-duration)
            var(--default-transition-timing-function) forwards;

        animation-delay: var(--delay);
    }

    @keyframes slide-in {
        to {
            transform: translateY(0);
        }
    }
</style>
