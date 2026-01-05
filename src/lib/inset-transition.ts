import type { EasingFunction, TransitionConfig } from 'svelte/transition'

import { quintOut } from 'svelte/easing'

// just a global store, I don't need to worry about key conflicts right now
const fromNodes = new Map<string, Element>()
const returnRects = new Map<string, DOMRect>()

export interface InsetClipParams {
    key: string
    duration?: number
    delay?: number
    easing?: EasingFunction
    registerReturn?: boolean
    shouldRun?: () => boolean
}

const DEFAULT_PARAMS: Required<Omit<InsetClipParams, 'key'>> = {
    duration: 750,
    delay: 0,
    easing: quintOut,
    registerReturn: false,
    shouldRun: () => true,
}

export function insetSend(node: Element, params: InsetClipParams): TransitionConfig {
    const { key, duration, delay, easing } = Object.assign({}, DEFAULT_PARAMS, params)

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fromNodes.set(key, node)
    }

    // this needs a duration so that the target element can be available when
    // the receiving happens, even if there's no css involved (maybe in the future)
    return { delay, duration, easing }
}

export function insetReceive(node: Element, params: InsetClipParams): TransitionConfig {
    const { key, duration, delay, easing, registerReturn, shouldRun } = Object.assign(
        {},
        DEFAULT_PARAMS,
        params,
    )

    const fromNode = fromNodes.get(key)
    if (!fromNode || !shouldRun()) {
        // no fallback right now, just a clean page load
        return { delay, duration, easing }
    }

    // clear the entry from the map, it shouldn't be reused
    fromNodes.delete(key)

    const fromRect = fromNode.getBoundingClientRect()
    const toRect = node.getBoundingClientRect()

    if (registerReturn) {
        returnRects.set(key, fromRect)
    }

    return {
        delay,
        duration,
        easing,
        css: insetCss(fromRect, toRect),
    }
}

export function insetReturn(node: Element, params: InsetClipParams): TransitionConfig {
    const { key, duration, delay, easing, shouldRun } = Object.assign({}, DEFAULT_PARAMS, params)

    const returnRect = returnRects.get(key)
    if (!returnRect || !shouldRun()) {
        // no fallback right now, just a clean page load
        return { duration: 0 }
    }

    returnRects.delete(key)

    const fromRect = node.getBoundingClientRect()
    const insetFn = insetCss(returnRect, fromRect)

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
            z-index: 100;
            position: relative;
            opacity: ${Math.min(1, t * 8) * 100}%;
            ${insetFn(t, u)}
        `,
    }
}

function insetCss(from: DOMRect, to: DOMRect): NonNullable<TransitionConfig['css']> {
    // yeah I technically should not be adding this window logic here
    const insetTop = Math.max(0, from.top - to.top) - window.scrollY
    const insetLeft = Math.max(0, from.left - to.left) - window.scrollX
    const insetRight =
        Math.max(0, Math.min(to.right, document.body.clientWidth) - from.right) + window.scrollX
    const insetBottom = Math.max(0, Math.min(to.bottom, document.body.clientHeight) - from.bottom)

    // a clip-path that grows to the size of the target node from the given node
    // also lerps between the border radius (though assumes symmetry)
    return (_t, u) => `
        max-height: 100vh;
        max-width: 100vw;
        overflow: hidden;
        clip-path: inset(
            ${insetTop * u}px
            ${insetRight * u}px
            ${insetBottom * u}px
            ${insetLeft * u}px
        );
    `
}
