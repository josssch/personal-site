import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // it seems to be a toss up between whether GitHub pages supports this
            // so I will be trying it and crossing my fingers
            precompress: true,
        }),

        csp: {
            mode: 'hash',
            directives: {
                'script-src': ['self'],
            },
        },
    },
}

export default config
