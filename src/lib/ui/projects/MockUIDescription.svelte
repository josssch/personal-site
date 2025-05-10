<script>
    import FancyLink from '../typography/FancyLink.svelte'
</script>

<h2>Manageable Development</h2>

<p>
    Starting a new website nowadays requires you setup a long list of things before you even get
    started with the actual design and development process.
</p>

<ol>
    <li>
        It must be accessible
        <ul>
            <li>Proper color contrast for readability</li>
            <li>Screen readers should function as expected</li>
            <li>Keyboard navigation support</li>
        </ul>
    </li>

    <li>It must have good SEO</li>
    <li>The design should be consistent</li>
    <li>It must be responsive across all screen sizes</li>
    <li>It has to work on all major browsers</li>
</ol>

<p>
    For a larger team of people this isn't much of an issue; roles can be established. When it's
    just one or two people though, it is <strong>a lot of time that could be better spent.</strong>
</p>

<h2>A Starting Point</h2>

<p>
    The goal with Mock UI is to provide a starting point for some of those things, while eliminating
    the restrictions that come with a component library. The philosophy behind this was largely
    inspired by <FancyLink link={{ href: 'https://ui.shadcn.com/', label: 'Shadcn UI' }} />.
</p>

<p>
    Components are provided out-of-the-box with an easy and extensible interface to interact or
    modify them. A Tailwind config is provided that allows general purpose theming of the starting
    site so light usage is <em>also</em> possible.
</p>

<p>
    Everything in Mock UI is carefully considered and designed. It's important that a balance
    between simplicity and flexibility is maintained. The design philosophy is centered around being
    minimalist and consistent. A lot of the design choices can be read about in the
    <FancyLink link={{ href: '/docs', label: 'documentation' }} /> on GitHub.
</p>
