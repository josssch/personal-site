<script lang="ts">
    import merge from '$lib/utils/class-merge'
    import ProjectCard from '../components/ProjectCard.svelte'

    const { number, title, summary, class: clazz = '' } = $props()
</script>

<div class={merge('relative size-full', clazz)}>
    <div class="container mx-auto grid h-full grid-rows-2 px-lg py-xl sm:grid-cols-2 sm:px-xl">
        <h1 class="row-start-1 self-end text-4xl">
            <span class="font-extralight">{number}</span>
            <span class="mt-lg block font-bold">{title}</span>
        </h1>

        <ProjectCard
            class="row-start-2 self-center"
            {title}
            {summary}
        />

        <div class="row-span-full max-sm:hidden">hi</div>
    </div>
</div>
