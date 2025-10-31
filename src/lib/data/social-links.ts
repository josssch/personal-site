import type { Link } from '$lib/types/link'
import type { Component } from 'svelte'

import SiSignal from '@icons-pack/svelte-simple-icons/icons/SiSignal'
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
    signal: {
        href: 'https://signal.me/#eu/TmlOsE5cIv1hVjLSDgdY6ySv2T6ulhNQAdgwe7blGbltSV7EY4lNI5xm0O0QKhJj',
        label: 'Signal',
        icon: SiSignal as unknown as Component,
    },
} as const satisfies Record<string, Link>
