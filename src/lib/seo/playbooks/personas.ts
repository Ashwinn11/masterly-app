import { SEOPageData, commonFAQs } from '../shared';

export const personaPages: SEOPageData[] = [
    {
        slug: 'medical-school-study-app',
        title: 'Medical School Study App',
        subtitle: 'Built for Med Students',
        heroTitle: 'The Ultimate Medical School Study App',
        heroSubtitle: 'Master anatomy, pharmacology, and pathology with AI-powered flashcards designed specifically for medical students.',
        description: 'The best study app for medical students. From USMLE prep to anatomy diagrams, Masterly\'s AI helps you survive and thrive in med school.',
        keywords: [
            'medical school study app', 'usmle prep app', 'anatomy flashcards', 'pharmacology study tool',
            'mcat study app', 'med school productivity', 'clinical case study app', 'residency prep'
        ],
        features: [
            { title: 'Medical Content AI', description: 'Trained on medical terminology and concepts for accurate cards.', icon: 'Brain' },
            { title: 'Image Recognition', description: 'Upload anatomy diagrams and get labeled flashcards.', icon: 'Image' },
            { title: 'USMLE Prep', description: 'Optimized for Step 1, Step 2, and Step 3 preparation.', icon: 'CheckCircle' },
            { title: 'Clinical Cases', description: 'Practice with case-based questions and scenarios.', icon: 'FileText' }
        ],
        steps: [
            { number: '01', title: 'Upload Lectures', description: 'Add your medical school lectures and textbook PDFs' },
            { number: '02', title: 'AI Creates Cards', description: 'Get comprehensive flashcards covering all key concepts' },
            { number: '03', title: 'Ace Your Exams', description: 'Study efficiently with spaced repetition and active recall' }
        ],
        faqs: [
            { question: 'Can it handle complex medical terminology?', answer: 'Yes, our AI is trained on medical corpora and recognizes everything from pharmacology names to complex pathology descriptions.' },
            { question: 'Is it useful for Step 1 and Step 2?', answer: 'Many students use Masterly to supplement their USMLE prep. It\'s perfect for memorizing high-yield facts and clinical associations.' },
            { question: 'Does it support Image Occlusion?', answer: 'Yes! You can block out parts of medical diagrams (like anatomy) and test yourself on the labels—a favorite feature for medical students.' },
            { question: 'Can I upload my class lecture PowerPoints?', answer: 'Yes, just export them as PDFs and upload. Masterly will extract the key talking points and slide data.' },
            { question: 'How is it better than a generic study app?', answer: 'Masterly understands the structure of medical data. It knows the difference between a "symptom" and a "diagnosis," making the generated questions much more relevant.' },
            { question: 'Can I study on the go during rotations?', answer: 'Our mobile apps are perfect for quick 5-minute study sessions between patient visits or during commuting.' },
            commonFAQs.isFree,
            { question: 'Is there a limit to how many medical decks I can have?', answer: 'No, you can organize your study by blocks, rotations, or subjects (e.g., Cardiology, Neurology).' },
            commonFAQs.privacy,
            { question: 'Can I import AnKing or other community decks?', answer: 'Yes, any .apkg file can be imported into Masterly seamlessly.' }
        ],
        ctaTitle: 'Join Thousands of Med Students',
        ctaSubtitle: 'Start studying smarter for your medical exams today.',
        testimonials: [
            { name: 'Dr. Kevin W.', role: 'PGY-1 Resident', content: 'I used Masterly during my M3 rotations. Being able to quickly turn my notes into flashcards on my phone was a lifesaver.', rating: 5 }
        ],
        relatedPages: ['pdf-to-flashcards', 'active-recall', 'anki-alternative']
    },
    {
        slug: 'law-school-study-app',
        title: 'Law School Study App',
        subtitle: 'Master Case Law Faster',
        heroTitle: 'AI Study App for Law Students',
        heroSubtitle: 'Turn case briefs, statutes, and legal concepts into flashcards. Perfect for bar exam prep and law school success.',
        description: 'The premier study tool for law students. Analyze case briefs, memorize statutes, and prepare for the Bar exam with AI-powered active recall.',
        keywords: [
            'law school study app', 'bar exam prep app', 'case brief flashcards', 'lsat study tool',
            'legal memorization', 'memorizing statutes', 'law student productivity', 'mbe prep'
        ],
        features: [
            { title: 'Case Brief Analysis', description: 'AI extracts key holdings, facts, and reasoning from cases.', icon: 'FileText' },
            { title: 'Bar Exam Ready', description: 'Optimized for MBE, MEE, and state bar preparation.', icon: 'CheckCircle' },
            { title: 'Legal Terminology', description: 'Trained on legal language for accurate flashcards.', icon: 'Brain' },
            { title: 'Rule Memorization', description: 'Perfect for memorizing rules, elements, and tests.', icon: 'Repeat' }
        ],
        steps: [
            { number: '01', title: 'Upload Cases', description: 'Add your case briefs, outlines, and study materials' },
            { number: '02', title: 'AI Extracts Rules', description: 'Get flashcards with holdings, rules, and key facts' },
            { number: '03', title: 'Master the Law', description: 'Review with spaced repetition until it sticks' }
        ],
        faqs: [
            { question: 'How does the AI handle long legal documents?', answer: 'Our system is optimized for "chunking" long documents. It identifies the IRAC structure (Issue, Rule, Application, Conclusion) to create targeted questions.' },
            { question: 'Is it helpful for the Bar Exam?', answer: 'Yes! It\'s particularly effective for the "black letter law" memorization required for the MBE and MEE portions.' },
            { question: 'Can it help with 1L subjects?', answer: 'Absolutely. It excels at memorizing elements of Torts, Contracts, and Property law.' },
            { question: 'Can I use it for LSAT prep?', answer: 'Yes, it\'s great for memorizing logical reasoning patterns and vocabulary.' },
            { question: 'Does it understand "legalese"?', answer: 'Our AI has been fine-tuned on legal data to ensure it correctly interprets jargon and formal legal language.' },
            { question: 'Can I share outlines with my study group?', answer: 'Yes, you can share entire decks based on your outlines with one click.' },
            commonFAQs.isFree,
            { question: 'What\'s the best way to use it for case law?', answer: 'Upload your rough case briefs, and have the AI generate cards for the specific "Ratio Decidendi" (basis of the decision).' },
            commonFAQs.privacy,
            commonFAQs.devices
        ],
        ctaTitle: 'Ace Law School & The Bar',
        ctaSubtitle: 'Join law students studying smarter with AI.',
        testimonials: [
            { name: 'Jennifer P.', role: '3L Student', content: 'Memorizing the Model Penal Code elements was so much easier once I put them into Masterly\'s spaced repetition system.', rating: 5 }
        ],
        relatedPages: ['active-recall', 'spaced-repetition', 'notes-to-flashcards']
    },
    {
        slug: 'exam-preparation-app',
        title: 'Exam Preparation App',
        subtitle: 'Ace Any Exam',
        heroTitle: 'Your Complete Exam Prep Solution',
        heroSubtitle: 'From midterms to finals, professional certifications to standardized tests - prepare efficiently with AI-powered study tools.',
        description: 'Prepare for any exam with Masterly. The all-in-one exam preparation app featuring AI flashcards, practice tests, and scientific review schedules.',
        keywords: [
            'exam preparation app', 'test prep app', 'how to study for tests', 'gmat study app',
            'gre prep', 'sat study tool', 'cpa exam prep', 'best app for studying'
        ],
        features: [
            { title: 'Any Subject', description: 'Works for any exam - academic, professional, or standardized.', icon: 'BookOpen' },
            { title: 'Smart Scheduling', description: 'AI creates a personalized study schedule for your exam date.', icon: 'Calendar' },
            { title: 'Practice Tests', description: 'Generate unlimited practice questions from your materials.', icon: 'FileText' },
            { title: 'Weak Spot Analysis', description: 'Identify and focus on your weakest areas.', icon: 'Activity' }
        ],
        steps: [
            { number: '01', title: 'Set Your Exam Date', description: 'Tell us when your exam is and what you need to study' },
            { number: '02', title: 'Upload Materials', description: 'Add all your study materials - notes, textbooks, slides' },
            { number: '03', title: 'Follow Your Plan', description: 'Study daily with AI-optimized review sessions' }
        ],
        faqs: [
            { question: 'How far in advance should I start using it?', answer: 'We recommend starting as early as possible. Spaced repetition works best over 2-4 weeks, but our AI "cram mode" can also help for last-minute reviews.' },
            { question: 'Does it provide practice questions?', answer: 'Yes, the AI generates both flashcards for memorization and multiple-choice quizzes for application.' },
            { question: 'Can I use it for professional certifications (CFA, PMP)?', answer: 'Many professionals use Masterly for high-stakes exams. The system is great for memorizing professional standards and formulas.' },
            { question: 'How does it help with test anxiety?', answer: 'By providing unlimited practice tests, you get used to the "testing effect," which builds confidence and reduces anxiety on the actual exam day.' },
            { question: 'Can it handle math and science formulas?', answer: 'Yes, with full LaTeX support, you can study complex chemical structures or math equations easily.' },
            { question: 'Will it sync with my calendar?', answer: 'You can set reminders and study goals within the app to ensure you stay on track for your exam date.' },
            commonFAQs.howItWorks,
            commonFAQs.isFree,
            { question: 'Can I study with friends?', answer: 'Yes, shared study sets and group quizzes are perfect for group preparation.' },
            commonFAQs.privacy
        ],
        ctaTitle: 'Start Your Exam Prep Journey',
        ctaSubtitle: 'Join students who improved their grades by 20%+.',
        relatedPages: ['ai-quiz-generator', 'active-recall', 'pdf-to-flashcards']
    }
];
