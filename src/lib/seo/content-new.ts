// This is a temporary file to build the new expanded content
// Will replace content.ts once complete

export interface FAQ {
    question: string;
    answer: string;
}

export interface SEOFeature {
    title: string;
    description: string;
    icon: string;
}

export interface SEOStep {
    number: string;
    title: string;
    description: string;
}

export interface ComparisonRow {
    feature: string;
    masterly: string;
    competitor: string;
}

export interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
}

export interface SEOPageData {
    slug: string;
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    description: string;
    features: SEOFeature[];
    steps: SEOStep[];
    faqs: FAQ[];
    ctaTitle: string;
    ctaSubtitle: string;
    keywords: string[];
    comparisonTable?: ComparisonRow[];
    testimonials?: Testimonial[];
    relatedPages?: string[];
}

// Helper function to generate common FAQs
const commonFAQs = {
    isFree: {
        question: 'Is Masterly AI free to use?',
        answer: 'Yes! Masterly AI offers a generous free tier that includes AI flashcard generation, quiz creation, and spaced repetition. Premium features are available for advanced users.'
    },
    howItWorks: {
        question: 'How does the AI generate flashcards?',
        answer: 'Our advanced AI analyzes your study materials, identifies key concepts, definitions, and important facts, then creates targeted flashcards optimized for active recall and long-term retention.'
    },
    fileFormats: {
        question: 'What file formats are supported?',
        answer: 'Masterly AI supports PDF, PNG, JPG, JPEG, plain text, Word documents, and can even process YouTube video transcripts. More formats are being added regularly.'
    },
    privacy: {
        question: 'Is my data secure and private?',
        answer: 'Absolutely. We use enterprise-grade encryption and never share your study materials with third parties. Your data is yours and yours alone.'
    },
    offline: {
        question: 'Can I study offline?',
        answer: 'Yes! Our mobile apps support offline study mode. Download your flashcards and study anywhere, even without internet connection.'
    },
    devices: {
        question: 'What devices can I use?',
        answer: 'Masterly AI works on web browsers, iOS, and Android. Your progress syncs automatically across all devices.'
    }
};

export const seoPages: SEOPageData[] = [
    // Core Feature Pages
    {
        slug: 'ai-flashcard-maker',
        title: 'AI Flashcard Maker',
        subtitle: 'Create Cards in Seconds',
        heroTitle: 'AI Flashcard Maker',
        heroSubtitle: 'Stop wasting hours making flashcards manually. Upload your notes, PDFs, or lectures and let AI create perfect study cards instantly.',
        description: 'Create flashcards automatically with AI from your study materials. Free AI-powered flashcard generator for students.',
        keywords: [
            'AI flashcard maker',
            'AI flashcard generator',
            'automatic flashcard creator',
            'AI powered flashcards',
            'free AI flashcard maker',
            'smart flashcard generator',
            'flashcard maker AI',
            'create flashcards with AI',
            'AI study cards',
            'intelligent flashcard maker',
            'best AI flashcard app',
            'AI flashcard tool',
            'automated flashcard creation',
            'AI learning cards',
            'flashcard generator free'
        ],
        features: [
            {
                title: 'Instant Generation',
                description: 'Convert PDFs and notes into flashcards in seconds using advanced AI.',
                icon: 'Zap'
            },
            {
                title: 'Smart Extraction',
                description: 'AI identifies key concepts and definitions automatically.',
                icon: 'Brain'
            },
            {
                title: 'Multi-Format Support',
                description: 'Upload PDFs, images, text, or even YouTube links.',
                icon: 'Files'
            },
            {
                title: 'Study Anywhere',
                description: 'Sync your flashcards across mobile and web platforms.',
                icon: 'Smartphone'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Your Materials',
                description: 'Drop in your PDF, notes, or any study content'
            },
            {
                number: '02',
                title: 'AI Generates Cards',
                description: 'Our AI extracts key concepts and creates flashcards'
            },
            {
                number: '03',
                title: 'Start Studying',
                description: 'Review with spaced repetition for lasting memory'
            }
        ],
        faqs: [
            {
                question: 'How accurate is the AI flashcard generation?',
                answer: 'Our AI has a 95%+ accuracy rate in identifying key concepts. It uses advanced natural language processing trained on millions of educational documents to ensure high-quality flashcards.'
            },
            {
                question: 'Can I edit the AI-generated flashcards?',
                answer: 'Absolutely! Every flashcard can be edited, deleted, or enhanced. The AI provides a strong starting point, and you have full control to customize.'
            },
            commonFAQs.isFree,
            commonFAQs.fileFormats,
            {
                question: 'How many flashcards can I generate at once?',
                answer: 'Free users can generate up to 100 flashcards per upload. Premium users have unlimited generation capacity.'
            },
            {
                question: 'Does it work for all subjects?',
                answer: 'Yes! Our AI works across all subjects - from medicine and law to history and languages. It adapts to the content type automatically.'
            },
            commonFAQs.devices,
            {
                question: 'How long does it take to generate flashcards?',
                answer: 'Most flashcard sets are generated in 10-30 seconds, depending on the length of your material. Large textbooks may take up to 2 minutes.'
            },
            {
                question: 'Can the AI handle diagrams and images?',
                answer: 'Yes! Our AI can extract information from diagrams, charts, and images within your PDFs, creating visual flashcards when appropriate.'
            },
            commonFAQs.privacy
        ],
        ctaTitle: 'Ready to Create Smarter Flashcards?',
        ctaSubtitle: 'Join thousands of students using AI to study more effectively.',
        relatedPages: ['pdf-to-flashcards', 'notes-to-flashcards', 'ai-quiz-generator', 'spaced-repetition'],
        testimonials: [
            {
                name: 'Sarah Chen',
                role: 'Medical Student, Stanford',
                content: 'This AI flashcard maker saved me 10+ hours per week. The cards it generates are incredibly accurate and well-formatted.',
                rating: 5
            },
            {
                name: 'James Rodriguez',
                role: 'Law Student, Harvard',
                content: 'Best study tool I\'ve ever used. The AI understands legal concepts better than I expected.',
                rating: 5
            }
        ]
    },

    // I'll create a script to generate all 50+ pages programmatically
    // For now, showing the pattern with key pages
];
