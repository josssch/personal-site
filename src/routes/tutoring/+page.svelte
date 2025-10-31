<script lang="ts">
    import { resolve } from '$app/paths'

    import { socialLinks } from '$lib/data/social-links'
    import Signature from '$lib/ui/branding/Signature.svelte'
    import Button from '$lib/ui/form/Button.svelte'
    import Markdown from '$lib/ui/typography/Markdown.svelte'
</script>

<main class="main mx-auto">
    <article class="main__article mx-auto mt-xl">
        <Markdown>
            <h1>Programming Tutoring</h1>

            <p>
                I'm Josh, and I've been programming for over 10 years now. I've worked as a software
                developer in various industries including retail and finance, and I'm ready to share
                my knowledge and help you succeed!
            </p>

            <p>
                My goal in tutoring is to help build and establish a
                <strong>strong foundation in programming concepts and best practices.</strong>
                Not just to help you succeed in your courses, but also prepare you for a career in software
                development.
            </p>

            <p>
                In today's world of ever-increasing AI usage there are a lot of upcoming programmers
                who are completely unprepared for the realities of software development.
            </p>

            <h2>Get Started Today</h2>

            <p>
                Before we start, we will discuss <strong>your goals</strong> and what
                <strong>you</strong> would like to accomplish. It's important that our sessions focus
                on what you want to learn and achieve.
            </p>

            <p>
                I will walk you through <strong>assignments, quizzes, and projects</strong> all while
                making sure you understand the fundamentals behind them. We'll adhere to best practices
                according to your course material, and I'll introduce you to some of my own.
            </p>

            <Button
                class="not-prose w-full text-lg theme-bg-blue-900 theme-text-white"
                href={socialLinks.email.href}
            >
                <socialLinks.email.icon />
                Discuss Tutoring Options
            </Button>

            <h2>My Qualifications</h2>

            <p>
                I was hired out of a co-op into a full-time software development position, which I
                held for over 2 years. Currently, I'm working for a retail store developing
                personalized business solutions to help streamline their day-to-day operations. For
                more details, <a href={resolve('/about')}>see my full resume.</a>
            </p>

            <p>
                I am familiar with a large amount of popular frameworks, languages, and databases.
                Including but <strong>not limited to:</strong>
            </p>

            <ul>
                <li>C/C++</li>
                <li>Java</li>
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>React</li>
                <li>Python</li>
                <li>TypeScript</li>
            </ul>

            <p>
                Aside from technologies, this also includes deep knowledge of interpreters,
                compilers, algorithms, and advanced data structures.
            </p>

            <Signature class="ml-auto" />
        </Markdown>
    </article>
</main>
