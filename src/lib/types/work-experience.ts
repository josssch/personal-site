export interface WorkExperience {
    company?: string
    industry?: string

    title: string

    startedOn: string
    endedOn?: string
    isCurrent?: boolean

    duties: string[]
}
