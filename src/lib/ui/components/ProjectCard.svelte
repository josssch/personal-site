<script>
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'

    import merge from '$lib/utils/class-merge'
    import Button from '../form/Button.svelte'

    const { title, summary, class: clazz = '' } = $props()
</script>

<div class={merge('max-w-128 rounded-2xl bg-theme-bg-1 p-lg shadow-lg', clazz)}>
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">{title}</h1>

        <ArrowUpRight />
    </div>

    <p class="my-lg text-current/80">{summary}</p>

    <div class="flex gap-md">
        <Button class="grow">Website</Button>
        <Button class="min-w-12">G</Button>
    </div>
</div>
