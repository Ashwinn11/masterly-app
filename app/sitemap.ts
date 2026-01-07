import { MetadataRoute } from 'next'
import { seoPages } from '@/lib/seo/content'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://masterlyapp.in'
    const currentDate = new Date()

    // Homepage - Highest priority
    const homepage: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ]

    // Authentication pages - High priority for conversion
    const authPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
    ]

    // Programmatic SEO pages - Very high priority for organic traffic
    // Categorize by intent for better organization
    const competitorPages = seoPages
        .filter(p => p.slug.includes('alternative'))
        .map((page) => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.95, // Higher priority for competitor comparison pages
        }))

    const featurePages = seoPages
        .filter(p => !p.slug.includes('alternative') && !p.slug.includes('school') && !p.slug.includes('exam'))
        .map((page) => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

    const targetAudiencePages = seoPages
        .filter(p => p.slug.includes('school') || p.slug.includes('exam'))
        .map((page) => ({
            url: `${baseUrl}/${page.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }))

    // Support and legal pages - Lower priority but still important
    const supportPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/help`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ]

    const legalPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ]

    return [
        ...homepage,
        ...authPages,
        ...competitorPages,
        ...featurePages,
        ...targetAudiencePages,
        ...supportPages,
        ...legalPages,
    ]
}
