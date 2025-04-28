<script lang="ts">
    import type { MetaTagsProps } from '$lib/types/meta-tags'

    const {
        title = '',
        description,
        imagePath,
        imageAlt,
        twitterCard,
        path,
        urlFromPath = () => '',
        openGraphUrl,
        openGraphType = 'website',
        openGraphSiteName,
        formatTitle = title => title,
    }: MetaTagsProps = $props()

    const formattedTitle = formatTitle(title)
</script>

{#snippet meta(name: string, content?: string)}
    {#if name.startsWith('og:') && content}
        <!-- open graph PROPERLY uses the property attribute for namespaced tags -->
        <meta
            property={name}
            {content}
        />
    {:else if content}
        <!-- non-namespaced tags (and Twitter ._.) make use of the name attribute -->
        <meta
            {name}
            {content}
        />
    {/if}
{/snippet}

<svelte:head>
    <title>{formattedTitle}</title>
    {#each ['og:title', 'twitter:title'] as property}
        {@render meta(property, formattedTitle)}
    {/each}

    {#each ['description', 'og:description', 'twitter:description'] as property}
        {@render meta(property, description)}
    {/each}

    {#each ['og:image', 'twitter:image'] as property}
        {@render meta(property, urlFromPath(imagePath || '/'))}
    {/each}

    {#each ['og:image:alt', 'twitter:image:alt'] as property}
        {@render meta(property, imageAlt)}
    {/each}

    {@render meta('og:site_name', openGraphSiteName)}
    {@render meta('og:type', openGraphType)}
    {@render meta('og:url', openGraphUrl || urlFromPath(path || '/'))}

    {@render meta('twitter:card', twitterCard)}
</svelte:head>
