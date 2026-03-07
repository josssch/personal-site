<script lang="ts">
    import type { ScreenState } from '../carousel/FullscreenCarousel.svelte'

    import Check from '@lucide/svelte/icons/check'
    import Loader from '@lucide/svelte/icons/loader'
    import Play from '@lucide/svelte/icons/play'
    import { onDestroy } from 'svelte'

    import BlurDown from '../animators/BlurDown.svelte'
    import ProjectBgDetail from '../carousel/ProjectBgDetail.svelte'

    let { screenState }: { screenState: ScreenState } = $props()

    let menuBarEl: BlurDown

    $effect(() => {
        if (screenState.isVisible) {
            menuBarEl.play()
        }
    })

    const menuItems = ['Update Homebrew', 'Run DB Service', 'Stop DB Service', 'Cleanup Downloads']
    let itemState: ('idle' | 'pending' | 'completed')[] = $state(
        Array.from({ length: menuItems.length }, () => 'idle'),
    )

    const timeouts: ReturnType<typeof setTimeout>[] = []
    onDestroy(() => {
        timeouts.forEach(clearTimeout)
    })

    function runAfter(fn: () => unknown, delay: number = 5000): void {
        const timeout = setTimeout(() => {
            timeouts.splice(timeouts.indexOf(timeout), 1)
            fn()
        }, delay)

        timeouts.push(timeout)
    }

    const handleClick = (i: number) => {
        if (itemState[i] !== 'idle') return

        itemState[i] = 'pending'

        runAfter(() => {
            itemState[i] = 'completed'

            runAfter(() => {
                itemState[i] = 'idle'
            }, 3000)
        }, 5000)
    }
</script>

{#snippet runMenu(labels: string[])}
    <ul
        class="inline-flex flex-col rounded-lg bg-black/50 p-md ring ring-current/50 ring-offset-1 ring-offset-black backdrop-blur-md ring-inset"
    >
        {#each labels as label, i}
            {@render runMenuItem(label, i)}
        {/each}
    </ul>
{/snippet}

{#snippet runMenuItem(label: string, i: number)}
    <li>
        <button
            class="inline-flex w-full items-center gap-md rounded-md px-md py-xs text-nowrap text-white/90 transition-colors duration-0 hover:bg-blue-600 hover:text-white"
            onclick={() => handleClick(i)}
        >
            {#if itemState[i] === 'pending'}
                <Loader class="animate-spin text-xs" />
            {:else if itemState[i] === 'completed'}
                <Check class="text-xs" />
            {:else}
                <Play
                    class="text-xs"
                    fill="currentColor"
                />
            {/if}

            <span class="mr-md">{label}</span>

            <!-- <ChevronRight class="ml-auto" /> -->
        </button>
    </li>
{/snippet}

<ProjectBgDetail class="-bg-linear-30 from-[#3B5695] to-[#094781]" />

<div class="mt-2xl self-center md:ml-auto md:scale-150">
    <BlurDown
        bind:this={menuBarEl}
        settings={{ delayMs: 500, duration: '1000ms', trigger: 'manual' }}
    >
        {@render runMenu(menuItems)}
    </BlurDown>
</div>
