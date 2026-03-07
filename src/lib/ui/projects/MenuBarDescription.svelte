<script lang="ts">
    import FancyLink from '../typography/FancyLink.svelte'
</script>

<p>
    This app is designed to live in your menu bar and be out of your way until you need it. It's as
    simple as adding a new script from your system then clicking it to run it.
</p>

<h3>Goal</h3>

<p>
    The goal is to reduce the amount of times I have to open a rogue terminal to retype a lengthly
    command or run a regular task. While some things can be setup on a schedule, there are others
    I'd prefer to run manually but quickly.
</p>

<p>
    Aside from reducing friction, this project is also serving as an entrypoint into SwiftUI for me.
    For future features,
    <FancyLink
        link={{
            label: 'specified in the repository,',
            href: 'https://github.com/josssch/menu-scripts?tab=readme-ov-file#planned-features',
        }}
    /> the goal is to reduce the need for paid macOS apps that are glorified command-line wrappers.
</p>

<h3>Current Features</h3>

<ul>
    <li>Allows reordering of scripts</li>
    <li>Shows trailing output of script's last run</li>
    <li>Parses script arguments</li>
</ul>
