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
    relatedPages?: string[]; // slugs of related pages
}

export const commonFAQs = {
    isFree: {
        question: 'Is Masterly AI free to use?',
        answer: 'Yes! Masterly AI offers a generous free tier that includes access to AI flashcard and quiz generation, spaced repetition, and our core study features. We believe every student should have access to world-class learning tools.'
    },
    howItWorks: {
        question: 'How does the AI generate flashcards and quizzes?',
        answer: 'Our advanced AI analyzes your study materials (PDFs, notes, or lectures), identifies key concepts, definitions, and high-yield facts, and transforms them into interactive study cards and practice questions optimized for your exams.'
    },
    fileSupport: {
        question: 'What file formats are supported?',
        answer: 'Masterly supports a wide range of formats including PDF, Word (DOCX), plain text, images (PNG, JPG), and even lecture transcripts or YouTube links.'
    },
    privacy: {
        question: 'Is my data secure and private?',
        answer: 'Absolutely. We take privacy seriously and use enterprise-grade encryption to protect your study materials. Your uploaded content is never shared with third parties.'
    },
    devices: {
        question: 'Which devices can I use Masterly on?',
        answer: 'Masterly is available on Web, iOS, and Android. Your study sets and progress sync instantly across all your devices so you can study anywhere, anytime.'
    },
    spacedRepetition: {
        question: 'What is the algorithm used for spaced repetition?',
        answer: 'We use the modern FSRS (Free Spaced Repetition Scheduler) algorithm, which is proven to be more efficient and accurate than the older SM-2 algorithm used by many other apps.'
    }
};
