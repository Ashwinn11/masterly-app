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
}

export const seoPages: SEOPageData[] = [
    {
        slug: 'ai-flashcard-maker',
        title: 'AI Flashcard Maker',
        subtitle: 'Create Cards in Seconds',
        heroTitle: 'AI Flashcard Maker',
        heroSubtitle: 'Stop wasting hours making flashcards manually. Upload your notes, PDFs, or lectures and let AI create perfect study cards instantly.',
        description: 'Create flashcards automatically with AI from your study materials',
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
                question: 'Is the AI flashcard maker free?',
                answer: 'Yes, Masterly offers a generous free tier that allows you to generate flashcards using AI every day.'
            },
            {
                question: 'What file formats are supported?',
                answer: 'We support PDF, PNG, JPG, JPEG, and plain text. More formats are being added constantly.'
            }
        ],
        ctaTitle: 'Ready to Create Smarter Flashcards?',
        ctaSubtitle: 'Join thousands of students using AI to study more effectively.'
    },
    {
        slug: 'pdf-to-flashcards',
        title: 'PDF to Flashcards',
        subtitle: 'Convert Documents Instantly',
        heroTitle: 'Convert PDF to Flashcards',
        heroSubtitle: 'Turn any textbook, research paper, or lecture slide PDF into a set of high-quality flashcards with one click.',
        description: 'Convert PDF documents into study flashcards automatically using AI',
        features: [
            {
                title: 'Bulk Processing',
                description: 'Handle large textbooks and lengthy documents with ease.',
                icon: 'Layers'
            },
            {
                title: 'Accuracy Guaranteed',
                description: 'Our AI understands context to create relevant questions.',
                icon: 'CheckCircle'
            },
            {
                title: 'Image Support',
                description: 'Even diagrams and tables can be converted into cards.',
                icon: 'Image'
            },
            {
                title: 'Instant Sync',
                description: 'Your new cards are ready on all your devices immediately.',
                icon: 'RefreshCw'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload PDF',
                description: 'Upload your textbook or notes in PDF format'
            },
            {
                number: '02',
                title: 'Select Pages',
                description: 'Choose the specific pages you want to study'
            },
            {
                number: '03',
                title: 'Get Flashcards',
                description: 'AI generates perfectly formatted active recall cards'
            }
        ],
        faqs: [
            {
                question: 'How many pages can I upload?',
                answer: 'Our free tier supports documents up to 50 pages. Premium users can upload much larger files.'
            },
            {
                question: 'Can it handle handwriting?',
                answer: 'Yes, our advanced OCR can read handwritten notes in most clear PDFs.'
            }
        ],
        ctaTitle: 'Turn Your PDFs into Grades',
        ctaSubtitle: 'Upload your first document now and see the magic.'
    },
    {
        slug: 'anki-alternative',
        title: 'Anki Alternative',
        subtitle: 'Modern Spaced Repetition',
        heroTitle: 'The Modern Anki Alternative',
        heroSubtitle: 'All the power of Anki&apos;s algorithms with a beautiful, intuitive interface. No plugins required, everything just works.',
        description: 'A modern, user-friendly alternative to Anki for spaced repetition flashcards',
        features: [
            {
                title: 'Better UI/UX',
                description: 'Clean, modern interface designed for focus and ease of use.',
                icon: 'Layout'
            },
            {
                title: 'Cloud Sync',
                description: 'Reliable, instant syncing without complex configuration.',
                icon: 'Cloud'
            },
            {
                title: 'AI Creation',
                description: 'Unlike Anki, we help you create content with AI.',
                icon: 'Sparkles'
            },
            {
                title: 'Mobile Apps',
                description: 'native iOS and Android apps that feel modern.',
                icon: 'Smartphone'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Import or Create',
                description: 'Easily import your Anki decks or create new ones with AI'
            },
            {
                number: '02',
                title: 'Review Seamlessly',
                description: 'Study on any device with our optimized mobile and web apps'
            },
            {
                number: '03',
                title: 'Track Progress',
                description: 'See your retention rates and study streaks with beautiful charts'
            }
        ],
        faqs: [
            {
                question: 'Can I import my Anki decks?',
                answer: 'Yes! We support .apkg imports so you don&apos;t lose any of your hard work.'
            },
            {
                question: 'Does it use the same algorithm?',
                answer: 'We use the modern FSRS algorithm, which is proven to be more efficient than Anki&apos;s default SM-2.'
            }
        ],
        ctaTitle: 'Upgrade Your Study Game',
        ctaSubtitle: 'Switch to a modern learning platform today.'
    },
    {
        slug: 'quizlet-alternative',
        title: 'Quizlet Alternative',
        subtitle: 'More Than Just Digital Cards',
        heroTitle: 'Best Quizlet Alternative',
        heroSubtitle: 'Don&apos;t pay for features that should be free. Get AI generation, spaced repetition, and ad-free studying without the premium price tag.',
        description: 'A more powerful and affordable alternative to Quizlet for students',
        features: [
            {
                title: 'Free Spaced Repetition',
                description: 'Scientific study methods shouldn&apos;t be behind a paywall.',
                icon: 'Repeat'
            },
            {
                title: 'No intrusive Ads',
                description: 'Study without distractions or constant premium popups.',
                icon: 'ShieldOff'
            },
            {
                title: 'Advanced AI Tools',
                description: 'Generate sets from any material, not just manually typing.',
                icon: 'Wand2'
            },
            {
                title: 'Personalized Coaching',
                description: 'Get an AI study coach that identifies your weak spots.',
                icon: 'User'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Content',
                description: 'Paste text or upload files to kickstart your study set'
            },
            {
                number: '02',
                title: 'AI Magic',
                description: 'Wait seconds for your comprehensive study materials'
            },
            {
                number: '03',
                title: 'Ace Exams',
                description: 'Use our quiz and flashcard modes to master the material'
            }
        ],
        faqs: [
            {
                question: 'Is Masterly really an alternative to Quizlet?',
                answer: 'Yes! We offer similar flashcard modes plus advanced AI and scientific spaced repetition that Quizlet lacks.'
            },
            {
                question: 'How much does it cost?',
                answer: 'Most features are free, and our premium plan is significantly more affordable than Quizlet Plus.'
            }
        ],
        ctaTitle: 'Stop Paying More for Less',
        ctaSubtitle: 'Join the thousands switching from Quizlet to Masterly AI.'
    },
    {
        slug: 'spaced-repetition',
        title: 'Spaced Repetition',
        subtitle: 'Learn Once, Remember Forever',
        heroTitle: 'Spaced Repetition System',
        heroSubtitle: 'Master the science of memory. Our advanced FSRS algorithm calculates the perfect time to review each card so you never forget.',
        description: 'The science-backed method to improve long-term memory and study efficiency',
        features: [
            {
                title: 'FSRS Algorithm',
                description: 'The most modern and efficient spaced repetition algorithm available.',
                icon: 'Activity'
            },
            {
                title: 'Optimized Schedules',
                description: 'Your study sessions are automatically planned for maximum retention.',
                icon: 'Calendar'
            },
            {
                title: 'Heatmaps & Stats',
                description: 'Visualize your learning journey and stay motivated.',
                icon: 'BarChart'
            },
            {
                title: 'Active Recall',
                description: 'Designed specifically to trigger deep memory retrieval.',
                icon: 'BrainCircuit'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Learn New Cards',
                description: 'Initial exposure to your study material'
            },
            {
                number: '02',
                title: 'First Review',
                description: 'Review shortly after learning to combat the forgetting curve'
            },
            {
                number: '03',
                title: 'Increasing Intervals',
                description: 'Study at wider gaps as the memory becomes more permanent'
            }
        ],
        faqs: [
            {
                question: 'What is the science behind it?',
                answer: 'It&apos;s based on the Ebbinghaus forgetting curve, showing that reviews at timed intervals stop memory decay.'
            },
            {
                question: 'How much time will I save?',
                answer: 'Studies show you can learn more in 50% less time compared to traditional methods.'
            }
        ],
        ctaTitle: 'Never Forget What You Learn',
        ctaSubtitle: 'Start using the world&apos;s most effective study method today.'
    }
];
