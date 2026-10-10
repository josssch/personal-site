export function isIntersecting(a: DOMRect | Element, b: DOMRect | Element) {
    const rectA = a instanceof Element ? a.getBoundingClientRect() : a
    const rectB = b instanceof Element ? b.getBoundingClientRect() : b

    return (
        rectA.bottom > rectB.top &&
        rectA.right > rectB.left &&
        rectA.top < rectB.bottom &&
        rectA.left < rectB.right
    )
}
