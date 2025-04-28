export type TwitterCard = 'summary' | 'summary_large_image' | 'app' | 'player'

export type OpenGraphType = 'website' | 'article' | 'book' | 'profile'

export interface MetaTagsProps {
    formatTitle?: (title: string) => string
    urlFromPath?: (path: string) => string

    path?: string

    title?: string
    description?: string
    imagePath?: string
    imageAlt?: string

    twitterCard?: TwitterCard

    openGraphUrl?: string
    openGraphType?: OpenGraphType
    openGraphSiteName?: string
}
