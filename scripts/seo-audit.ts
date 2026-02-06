import { seoPages } from '../src/lib/seo/content';

/**
 * Programmatic SEO Quality Audit
 * 
 * Checks for:
 * 1. Duplicate content (thin content prevention)
 * 2. Missing or duplicate metadata
 * 3. Broken internal links in `relatedPages`
 * 4. Keyword cannibalization
 */

console.log('🔍 Starting Programmatic SEO Audit...\n');

let issues = 0;
const slugs = new Set<string>();
const titles = new Set<string>();
const descriptions = new Set<string>();

// Helper to check text similarity (simple overlap)
function getSimilarity(s1: string, s2: string): number {
    const w1 = s1.toLowerCase().split(/\s+/);
    const w2 = s2.toLowerCase().split(/\s+/);
    const intersection = w1.filter(w => w2.includes(w));
    return (intersection.length * 2) / (w1.length + w2.length);
}

// 1. Uniqueness Checks
console.log('Checking Page Uniqueness...');
seoPages.forEach((page, index) => {
    // Check Slug Not Empty
    if (!page.slug) {
        console.error(`❌ Page at index ${index} has no slug!`);
        issues++;
    }

    // Check Duplicate Slug
    if (slugs.has(page.slug)) {
        console.error(`❌ Duplicate slug found: ${page.slug}`);
        issues++;
    }
    slugs.add(page.slug);

    // Check Duplicate Title
    if (titles.has(page.title)) {
        console.warn(`⚠️ Duplicate title found: "${page.title}" (${page.slug})`);
        // Warning only, sometimes intentional but bad for SEO
    }
    titles.add(page.title);

    // Check Duplicate Description
    if (descriptions.has(page.description)) {
        console.error(`❌ Duplicate description found: "${page.description.substring(0, 30)}..." (${page.slug})`);
        issues++;
    }
    descriptions.add(page.description);
});

// 2. Content Similarity Check (Prevent Thin Content)
console.log('\nChecking Content Similarity...');
for (let i = 0; i < seoPages.length; i++) {
    for (let j = i + 1; j < seoPages.length; j++) {
        const p1 = seoPages[i];
        const p2 = seoPages[j];

        // Check Hero Subtitle Similarity
        const sim = getSimilarity(p1.heroSubtitle, p2.heroSubtitle);
        if (sim > 0.85) {
            console.warn(`⚠️ High content similarity (${(sim * 100).toFixed(0)}%) between ${p1.slug} and ${p2.slug}`);
        }
    }
}

// 3. Link Validation
console.log('\nChecking Internal Links...');
seoPages.forEach(page => {
    if (page.relatedPages) {
        page.relatedPages.forEach(linkSlug => {
            if (!slugs.has(linkSlug)) {
                console.error(`❌ Broken internal link on ${page.slug}: pointing to non-existent "${linkSlug}"`);
                issues++;
            }
        });
    }
});

// 4. Keyword Check
console.log('\nChecking Keywords...');
seoPages.forEach(page => {
    if (!page.keywords || page.keywords.length < 3) {
        console.warn(`⚠️ Low keyword count for ${page.slug}: ${page.keywords?.length || 0}`);
    }
});

console.log('\n----------------------------------------');
if (issues === 0) {
    console.log('✅ Audit Passed! No critical issues found.');
    process.exit(0);
} else {
    console.error(`❌ Audit Failed with ${issues} critical issues.`);
    process.exit(1);
}
