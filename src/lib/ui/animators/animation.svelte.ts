import type { Action } from 'svelte/action'

import { onMount } from 'svelte'

import { isIntersecting } from '$lib/utils/dom'

export type AnimationTrigger = 'instant' | 'intersection' | 'manual'

export interface AnimationSettings {
    trigger: AnimationTrigger
    delayMs: number
    delayOnIntersect: boolean
    threshold: number
    duration: string
}

export const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
    delayMs: 0,
    delayOnIntersect: false,
    trigger: 'intersection',
    threshold: 0,
    duration: 'var(--default-transition-duration)',
}

export interface ControllerSettings {
    animation: AnimationSettings
    keyframes: string
}

export type ControllerAttributes = { play?: () => void; reset?: () => void }
export type ControllerElement = HTMLElement & ControllerAttributes

export const animateController: Action<HTMLElement, ControllerSettings, ControllerAttributes> = (
    node,
    { animation, keyframes },
) => {
    let hasPlayed = false

    const play = ({ withDelay = true } = {}) => {
        const delayStr = withDelay ? `${animation.delayMs}ms` : ''
        node.style.animation = `${keyframes} ${animation.duration}
            var(--default-transition-timing-function) forwards ${delayStr}`

        // update the hasPlayed flag after the animation has played
        hasPlayed = true
    }

    const reset = () => {
        node.style.animation = ''
        hasPlayed = false
    }

    // add our play function to the node so that it can be called externally
    ;(node as ControllerElement).play = play
    ;(node as ControllerElement).reset = reset

    onMount(() => {
        // keep track of whether the animation has played in this instance
        if (hasPlayed) return

        let observer: IntersectionObserver | null = null

        if (
            animation.trigger === 'instant' ||
            (animation.trigger === 'intersection' && isIntersecting(document.body, node))
        ) {
            play()
        } else if (animation.trigger === 'intersection') {
            observer = new IntersectionObserver(
                entries => {
                    // if no intersections have happened then we don't care
                    if (entries.length === 0) return

                    // if none of the entries are intersecting then we don't care
                    if (!entries.some(e => e.isIntersecting)) return

                    // once one of them is intersecting play the animation and stop observing
                    observer?.disconnect()
                    play({ withDelay: animation.delayOnIntersect })
                },
                { threshold: animation.threshold },
            )

            observer.observe(node)
        }

        return () => {
            node.style.removeProperty('animation')
            node.style.removeProperty('animationDelay')

            observer?.disconnect()
        }
    })
}
