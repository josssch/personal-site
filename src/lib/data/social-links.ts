import type { Link } from '$lib/types/link'

import Github from '@lucide/svelte/icons/github'
import Mail from '@lucide/svelte/icons/mail'

export const socialLinks = {
    email: {
        href: 'mailto:hi@jossh.dev',
        label: 'Email',
        icon: Mail,
    },
    github: {
        href: 'https://github.com/josssch',
        label: 'GitHub',
        icon: Github,
    },
} as const satisfies Record<string, Link>
