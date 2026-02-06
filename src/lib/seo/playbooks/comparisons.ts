import { SEOPageData, commonFAQs } from '../shared';

export const comparisonPages: SEOPageData[] = [
    {
        slug: 'anki-alternative',
        title: 'Anki Alternative',
        subtitle: 'Modern Spaced Repetition',
        heroTitle: 'The Modern Anki Alternative',
        heroSubtitle: 'All the power of Anki\'s algorithms with a beautiful, intuitive interface. No plugins required, everything just works.',
        description: 'Looking for a better Anki alternative? Masterly offers a modern UI, AI-powered card creation, and seamless cloud sync without the complexity.',
        keywords: [
            'anki alternative', 'better than anki', 'modern anki', 'anki vs masterly', 'free anki alternative',
            'spaced repetition app', 'fsrs algorithm app', 'user friendly flashcards'
        ],
        features: [
            { title: 'Better UI/UX', description: 'Clean, modern interface designed for focus and ease of use.', icon: 'Layout' },
            { title: 'Cloud Sync', description: 'Reliable, instant syncing without complex configuration.', icon: 'Cloud' },
            { title: 'AI Creation', description: 'Unlike Anki, we help you create content with AI.', icon: 'Sparkles' },
            { title: 'Mobile Apps', description: 'Native iOS and Android apps that feel modern.', icon: 'Smartphone' }
        ],
        steps: [
            { number: '01', title: 'Import or Create', description: 'Easily import your Anki decks or create new ones with AI' },
            { number: '02', title: 'Review Seamlessly', description: 'Study on any device with our optimized mobile and web apps' },
            { number: '03', title: 'Track Progress', description: 'See your retention rates and study streaks with beautiful charts' }
        ],
        faqs: [
            { question: 'Can I import my existing Anki decks?', answer: 'Yes! Masterly supports .apkg imports, so you can bring all your cards and progress with you.' },
            { question: 'Does Masterly use the same algorithm as Anki?', answer: 'We use the modern FSRS algorithm, which is even more efficient than Anki\'s default SM-2. It adapts to your memory better.' },
            { question: 'Is Masterly free like Anki?', answer: 'Yes, Masterly has a robust free tier. Unlike some Anki mobile versions, our iOS and Android apps are also free to use for core features.' },
            { question: 'Do I need to install plugins?', answer: 'No! Features like image occlusion, AI generation, and advanced stats are built-in. No more broken plugins after updates.' },
            { question: 'How is the mobile experience?', answer: 'Our apps are built natively for speed and ease of use. You get the full "Anki power" without the steep learning curve.' },
            commonFAQs.devices,
            commonFAQs.privacy,
            { question: 'Does it support LaTeX for math?', answer: 'Yes, we have full support for LaTeX and code snippets for technical subjects.' },
            { question: 'Can I study offline?', answer: 'Yes, our mobile apps support offline study. Your progress will sync once you\'re back online.' },
            { question: 'Can I cooperate with other students?', answer: 'Yes, shared decks and collaborative editing are built into Masterly.' }
        ],
        comparisonTable: [
            { feature: 'User Interface', masterly: 'Modern & Intuitive', competitor: 'Technical & Dated' },
            { feature: 'AI Card Generator', masterly: 'Included', competitor: 'Requires Plugins' },
            { feature: 'Cloud Sync', masterly: 'Instant & Automatic', competitor: 'Manual Setup' },
            { feature: 'Algorithm', masterly: 'FSRS (Modern)', competitor: 'SM-2 (Legacy)' },
            { feature: 'Setup Time', masterly: 'Seconds', competitor: 'Hours' }
        ],
        ctaTitle: 'Upgrade Your Study Game',
        ctaSubtitle: 'Switch to a modern learning platform today.',
        testimonials: [
            { name: 'Alex T.', role: 'Biochemistry Student', content: 'I tried Anki for 3 months but couldn\'t stand the UI. Masterly gives me the same results but is actually fun to use.', rating: 5 }
        ],
        relatedPages: ['spaced-repetition', 'quizlet-alternative', 'active-recall']
    },
    {
        slug: 'quizlet-alternative',
        title: 'Quizlet Alternative',
        subtitle: 'More Than Just Digital Cards',
        heroTitle: 'Best Quizlet Alternative',
        heroSubtitle: 'Don\'t pay for features that should be free. Get AI generation, spaced repetition, and ad-free studying without the premium price tag.',
        description: 'The best free Quizlet alternative for students. Masterly offers free spaced repetition, AI generation, and No ads—everything Quizlet Plus charges for.',
        keywords: [
            'quizlet alternative', 'free quizlet', 'quizlet vs masterly', 'best study app for students',
            'no ads flashcards', 'free spaced repetition', 'ai quizlet generator'
        ],
        features: [
            { title: 'Free Spaced Repetition', description: 'Scientific study methods shouldn\'t be behind a paywall.', icon: 'Repeat' },
            { title: 'No intrusive Ads', description: 'Study without distractions or constant premium popups.', icon: 'ShieldOff' },
            { title: 'Advanced AI Tools', description: 'Generate sets from any material, not just manually typing.', icon: 'Wand2' },
            { title: 'Personalized Coaching', description: 'Get an AI study coach that identifies your weak spots.', icon: 'User' }
        ],
        steps: [
            { number: '01', title: 'Upload Content', description: 'Paste text or upload files to kickstart your study set' },
            { number: '02', title: 'AI Magic', description: 'Wait seconds for your comprehensive study materials' },
            { number: '03', title: 'Ace Exams', description: 'Use our quiz and flashcard modes to master the material' }
        ],
        faqs: [
            { question: 'Is Masterly really free compared to Quizlet?', answer: 'Yes! While Quizlet puts "Learn" and "Test" modes behind a paywall, Masterly offers scientific study modes for free.' },
            { question: 'Can I import my Quizlet sets?', answer: 'Yes, you can easily import your existing Quizlet decks with our import tool. No need to start from scratch.' },
            { question: 'Does Masterly have ads?', answer: 'No, we believe in an ad-free study experience so you can focus on what matters: learning.' },
            { question: 'What study modes are available?', answer: 'We offer Flashcards, Practice Quizzes, Smart Learning (Spaced Repetition), and Summary modes.' },
            { question: 'Is there a limit on how many sets I can create?', answer: 'No, you can create unlimited study sets on the free plan.' },
            { question: 'Can Masterly handle images in cards?', answer: 'Yes, you can add images to any card for free. No premium subscription required for "Image Occlusion" or diagram study.' },
            commonFAQs.isFree,
            commonFAQs.devices,
            commonFAQs.privacy,
            { question: 'Can I share my sets with classmates?', answer: 'Yes, Masterly makes collaboration easy. You can share sets with a link or create study groups.' }
        ],
        comparisonTable: [
            { feature: 'Spaced Repetition', masterly: 'Free', competitor: '$35.99+/year' },
            { feature: 'AI Generation', masterly: 'Advanced', competitor: 'Limited' },
            { feature: 'Ads', masterly: 'Zero', competitor: 'Intrusive' },
            { feature: 'Offline Mode', masterly: 'Free', competitor: 'Premium Only' },
            { feature: 'Cost', masterly: 'Free Forever Tier', competitor: 'Expensive Subscription' }
        ],
        ctaTitle: 'Stop Paying More for Less',
        ctaSubtitle: 'Join the thousands switching from Quizlet to Masterly AI.',
        testimonials: [
            { name: 'Emily K.', role: 'High School Student', content: 'I switched after Quizlet restricted the Learn mode. Masterly is actually better and free!', rating: 5 }
        ],
        relatedPages: ['anki-alternative', 'ai-quiz-generator', 'spaced-repetition']
    }
];
