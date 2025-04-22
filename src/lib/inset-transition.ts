import type { EasingFunction, TransitionConfig } from 'svelte/transition'

import { quadOut } from 'svelte/easing'

// just a global store, I don't need to worry about key conflicts right now
const fromNodes = new Map<string, Element>()

export interface InsetClipParams {
    key: string
    duration?: number
    delay?: number
    easing?: EasingFunction
}

const DEFAULT_PARAMS: Required<Omit<InsetClipParams, 'key'>> = {
    duration: 750,
    delay: 0,
    easing: quadOut,
}

export function insetSend(node: Element, params: InsetClipParams): TransitionConfig {
    const { key, duration, delay, easing } = Object.assign({}, DEFAULT_PARAMS, params)
    fromNodes.set(key, node)

    // this needs a duration so that the target element can be available when
    // the receiving happens, even if there's no css involved (maybe in the future)
    return { delay, duration, easing }
}

export function insetReceive(node: Element, params: InsetClipParams): TransitionConfig {
    const { key, duration, delay, easing } = Object.assign({}, DEFAULT_PARAMS, params)

    const fromNode = fromNodes.get(key)
    if (!fromNode) {
        // no fallback right now, just a clean page load
        return { delay, duration, easing }
    }

    // clear the entry from the map, it shouldn't be reused
    fromNodes.delete(key)

    const fromStyle = getComputedStyle(fromNode)
    const toStyle = getComputedStyle(node)

    const fromBorder = fromStyle.borderRadius || '0'
    const toBorder = toStyle.borderRadius || '0'

    const { top, right, bottom, left } = fromNode.getBoundingClientRect()

    return {
        delay,
        duration,
        easing,
        // a clip-path that grows to the size of the target node from the given node
        // also lerps between the border radius (though assumes symmetry)
        css: (t, u) => `
            clip-path: rect(
                ${top * u}px
                calc(${right * u}px + ${100 * t}%)
                calc(${bottom * u}px + ${100 * t}%)
                ${left * u}px
                round calc(${fromBorder} * ${u} + ${t} * ${toBorder})
            );
        `,
    }
}
