export default function scrollToElement(el: HTMLElement, options?: ScrollToOptions) {
    const rect = el.getBoundingClientRect()

    // factor in a nav bar if it exists, as well as a bit of padding, this could be more
    // sophisticated, but this is good enough for my use case
    const offset = (document.querySelector('nav')?.clientHeight ?? 0) + 8
    const scrollTop = window.scrollY + rect.top

    window.scrollTo({
        behavior: 'smooth',
        ...options,
        top: scrollTop - offset,
    })
}
