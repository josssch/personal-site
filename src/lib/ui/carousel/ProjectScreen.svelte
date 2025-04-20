<script lang="ts">
    import type { SiComponentType } from '@icons-pack/svelte-simple-icons'
    import type { ScreenState } from './FullscreenCarousel.svelte'

    import { SiGithub } from '@icons-pack/svelte-simple-icons'
    import { Download, Globe } from '@lucide/svelte'

    import merge from '$lib/utils/class-merge'
    import FlyUp from '../animators/FlyUp.svelte'
    import SlideInText from '../animators/SlideInText.svelte'
    import ProjectCard from '../components/ProjectCard.svelte'

    interface Props {
        class?: string
        state: ScreenState
        title: string
        summary: string
    }

    const { title, summary, state: screenState, class: clazz = '' }: Props = $props()

    // when this component is first initialized, take the state of this prop
    // and if it's true, wait 500ms before playing the animations (this is to account
    // for page animations)
    const initialDelay = $state.snapshot(screenState.isVisible) ? 750 : 0

    let numberTextEl: SlideInText
    let titleTextEl: SlideInText
    let projectCardEl: FlyUp

    $effect(() => {
        if (screenState.isVisible) {
            numberTextEl.play()
            titleTextEl.play()
            projectCardEl.play()
        }
    })

    const displayNumber = $derived((screenState.index + 1).toString().padStart(2, '0'))
</script>

<div class={merge('relative size-full bg-theme-bg text-theme-on-bg', clazz)}>
    <div
        class="container mx-auto grid h-full grid-rows-2 gap-xl px-lg py-xl sm:px-xl lg:grid-cols-2"
    >
        <h1 class="col-start-1 self-end text-4xl">
            <SlideInText
                bind:this={numberTextEl}
                settings={{ delayMs: initialDelay + 100, trigger: 'manual' }}
            >
                <span class="font-extralight">{displayNumber}</span>
            </SlideInText>

            <SlideInText
                bind:this={titleTextEl}
                settings={{ delayMs: initialDelay, trigger: 'manual' }}
            >
                <span class="block font-bold">{title}</span>
            </SlideInText>
        </h1>

        <div class="col-start-1">
            <FlyUp
                bind:this={projectCardEl}
                settings={{ delayMs: initialDelay, trigger: 'manual' }}
            >
                <ProjectCard
                    class="transition-transform hover:-translate-y-1"
                    project={{
                        title,
                        summary,
                        description: '...',
                        links: [
                            { href: '#', label: 'Website', icon: Globe },
                            { href: '#g', label: 'Github', icon: SiGithub as SiComponentType },
                            { href: '#b', label: 'Download', icon: Download },
                        ],
                        tags: [],
                    }}
                />
            </FlyUp>
        </div>

        <!-- <div class="col-start-2 row-span-full max-sm:hidden">hi</div> -->
    </div>
</div>
