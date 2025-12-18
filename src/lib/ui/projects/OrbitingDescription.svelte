<script lang="ts">
    import FancyLink from '../typography/FancyLink.svelte'
</script>

<h3>The Problem</h3>

<p>
    In my time developing any kind of application, whether it be desktop, mobile, or web, there's
    always been a common problem. Configuration files; <strong>nobody likes them</strong>.
</p>

<p>
    The code I cherish the most in my projects tends to be in the backend, which is where I like to
    spend most of my time. Having to break away just to write a user interface takes away a lot of
    time from other things. Especially if you consider <em>just some</em> of the core principles you must
    follow:
</p>

<ol>
    <li>Consistency in layout and design</li>
    <li>User accessibility</li>
    <li>Ensuring responsive design for all devices</li>
    <li>Maintaining intuitive navigation</li>
</ol>

<p>
    This is fine for large projects where you need full control. But for
    <strong>relatively small projects</strong>, good frontend code often becomes burdensome and
    grows fast. Often to something that needs much more maintaining than you'd have ever liked.
</p>

<h3>The Goal</h3>

<p>
    With Orbiting as a project the goal was to design a centralised platform with the following
    goals in mind:
</p>

<ol>
    <li>Easy for developers to hook into (developer API)</li>
    <li>Accessible and well planned out user interface</li>
</ol>

<p>
    Developers use a standard library that interfaces with Orbiting to automatically update a user
    interface based on the config. It <strong>automatically handles migration</strong> of configs and
    allows for dividing between development and production environments.
</p>

<p>
    The configs are defined using the <FancyLink
        link={{ href: 'https://json-schema.org/specification', label: 'JSON schema standard' }}
    />. This was to ensure familiarity for developers and to avoid inventing yet another way to
    define schema.
</p>

<p>
    Ultimately with where Orbiting stands now, I feel I have succeeded in those two goals. However,
    there's still a long way to go and I'd still like to meet these goals:
</p>

<ol>
    <li>Config data encryption</li>
    <li>
        Improved user experience
        <ul>
            <li>
                Getting a control panel setup still has a learning curve as it requires file
                configuration, which defeats the whole purpose
            </li>
        </ul>
    </li>
    <li>Self-hosted instances</li>
</ol>
