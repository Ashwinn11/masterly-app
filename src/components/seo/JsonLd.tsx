export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Masterly AI",
    "url": "https://masterlyapp.in",
    "logo": "https://masterlyapp.in/icon.png",
    "description": "AI-powered study coach that transforms your notes, PDFs, and lectures into flashcards, quizzes, and summaries. Master any exam with spaced repetition and adaptive learning.",
    "sameAs": [
      "https://twitter.com/masterlyai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@masterlyapp.in"
    },
    "foundingDate": "2024",
    "slogan": "Study less. Learn more."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Masterly AI",
    "url": "https://masterlyapp.in",
    "description": "Transform your study materials into AI-powered flashcards, quizzes, and summaries. Master any exam with spaced repetition and adaptive learning.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://masterlyapp.in/dashboard?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Masterly AI",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "AI-powered study app that creates flashcards, quizzes, and summaries from your notes, PDFs, and lectures. Features spaced repetition, active recall, and Feynman technique for effective exam preparation.",
    "featureList": [
      "AI Flashcard Generator",
      "AI Quiz Generator", 
      "PDF to Flashcards Converter",
      "Spaced Repetition System",
      "Active Recall Practice",
      "Feynman Technique Learning",
      "Study Analytics Dashboard",
      "Multi-format Support (PDF, Notes, Lectures)"
    ],
    "screenshot": "https://masterlyapp.in/icon.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </>
  );
}
