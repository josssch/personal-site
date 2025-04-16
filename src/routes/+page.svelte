<script>
    import FullscreenCarousel from '$lib/ui/carousel/FullscreenCarousel.svelte'
    import ScreenLayout from '$lib/ui/carousel/ScreenLayout.svelte'
</script>

{#snippet screen1()}
    <ScreenLayout
        class="bg-neutral-950"
        number="01"
        title="Orbiting"
        summary="It's a funky little guy"
    />
{/snippet}

{#snippet screen2()}
    <ScreenLayout
        number="02"
        title="Lorem Ipsum"
        summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas enim lacus, placerat at velit ut, interdum laoreet velit. Proin sed felis risus."
    />
{/snippet}

{#snippet screen3()}
    <ScreenLayout
        class="bg-gray-950"
        number="03"
        title="Lorem Ipsum"
        summary="Praesent nec risus neque. Donec ullamcorper velit risus, quis sagittis dui efficitur ut. Mauris aliquam sed eros a finibus. Duis vestibulum nec nisi et tincidunt."
    />
{/snippet}

<FullscreenCarousel screens={[screen1, screen2, screen3, screen1, screen2, screen3]} />
