export default function toHash(normal: string) {
    return normal.replace(/\s+/g, '-').toLowerCase()
}
