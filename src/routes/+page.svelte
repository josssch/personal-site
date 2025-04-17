<script lang="ts">
    import type { ScreenState } from '$lib/ui/carousel/FullscreenCarousel.svelte'

    import FullscreenCarousel from '$lib/ui/carousel/FullscreenCarousel.svelte'
    import ScreenLayout from '$lib/ui/carousel/ScreenLayout.svelte'
</script>

{#snippet screen1(state: ScreenState)}
    <ScreenLayout
        class="color-scheme-neutral bg-neutral-950"
        title="Orbiting"
        summary="It's a funky little guy"
        index={state.index}
        visible={state.isVisible}
    />
{/snippet}

{#snippet screen2(state: ScreenState)}
    <ScreenLayout
        index={state.index}
        title="Lorem Ipsum"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim lacus, placerat at velit ut, interdum laoreet velit. Proin sed felis risus."
        visible={state.isVisible}
    />
{/snippet}

{#snippet screen3(state: ScreenState)}
    <ScreenLayout
        class="bg-gray-950"
        index={state.index}
        title="Lorem Ipsum"
        summary="Praesent nec risus neque. Donec ullamcorper velit risus, quis sagittis dui efficitur ut. Mauris aliquam sed eros a finibus. Duis vestibulum nec nisi et tincidunt."
        visible={state.isVisible}
    />
{/snippet}

<FullscreenCarousel screens={[screen1, screen2, screen3, screen1, screen2, screen3]} />
