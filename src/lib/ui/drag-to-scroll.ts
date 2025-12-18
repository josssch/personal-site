import type { Action } from 'svelte/action'

export interface DragToScrollOptions {
    xMultiplier?: number
    yMultiplier?: number
}

export const dragToScroll: Action<HTMLElement, DragToScrollOptions | undefined> = (
    el,
    { xMultiplier = 1, yMultiplier = 1 } = {},
) => {
    let isDragging = false
    let startX = 0
    let startY = 0

    const onMouseDown = (e: MouseEvent) => {
        // only respond to primary button for mice
        if (e.button !== 0) return
        e.preventDefault()

        isDragging = true
        startX = e.clientX
        startY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY

        el.scrollLeft -= deltaX * xMultiplier
        el.scrollTop -= deltaY * yMultiplier

        startX = e.clientX
        startY = e.clientY
    }

    const endDrag = () => {
        isDragging = false
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseup', endDrag)
    el.addEventListener('mouseleave', endDrag)

    return {
        destroy() {
            el.removeEventListener('mousedown', onMouseDown)
            el.removeEventListener('mousemove', onMouseMove)
            el.removeEventListener('mouseup', endDrag)
            el.removeEventListener('mouseleave', endDrag)
        },
    }
}
