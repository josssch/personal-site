export default function isEventSupported(eventName: string): boolean {
    const testElement = document.createElement('div')
    return eventName in testElement
}
