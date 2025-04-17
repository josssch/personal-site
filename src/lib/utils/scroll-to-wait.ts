/**
 * Calls scrollTo and waits for it to finish
 * @returns A promise that resolves when the scroll is complete, resolved value is whether it was successful
 */
export default async function scrollToWait(
    element: Element,
    options: ScrollToOptions,
    { tolerance = 2, timeoutMs = 3_000 } = {},
) {
    element.scrollTo(options)

    // no need to wait if the scroll behavior is going to be instant, incase I call it with instant for some reason
    if (
        (options.behavior === 'auto' && getComputedStyle(element).scrollBehavior === 'instant') ||
        options.behavior === 'instant'
    )
        return true

    // default the target to the options provided or the current scroll position if not provided
    const targetLeft = options.left ?? element.scrollLeft
    const targetTop = options.top ?? element.scrollTop

    // create a Promise that constantly checks the scroll position until it's within a
    // certain distance of the target distance (left or top, just incase we ever want to)
    const scrollWaiter = new Promise<boolean>(resolve => {
        function checkScroll() {
            const { scrollLeft, scrollTop } = element

            if (
                Math.abs(scrollLeft - targetLeft) < tolerance &&
                Math.abs(scrollTop - targetTop) < tolerance
            ) {
                resolve(true)
                return
            }

            requestAnimationFrame(checkScroll)
        }

        checkScroll()
    })

    // make the scroll waiter race against a timeout promise in the case
    // a user interrupts a scroll or something blocks it from happening
    return Promise.race([
        scrollWaiter,
        new Promise(resolve => setTimeout(() => resolve(false), timeoutMs)),
    ])
}
