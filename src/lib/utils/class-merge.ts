import type { ClassValue } from 'clsx/lite'

import clsx from 'clsx/lite'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            spacing: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
        },
    },
})

export default function merge(...classes: ClassValue[]): string {
    return twMerge(clsx(...classes))
}
