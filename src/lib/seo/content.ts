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
        ctaSubtitle: 'Join thousands of students using AI to study more effectively.',
        keywords: ['ai flashcard maker', 'automatic flashcards', 'smart flashcards', 'study ai', 'flashcard generator']
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
        ctaSubtitle: 'Upload your first document now and see the magic.',
        keywords: ['pdf to flashcards', 'pdf flashcard converter', 'convert pdf', 'study from pdf', 'textbook flashcards']
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
        ctaSubtitle: 'Switch to a modern learning platform today.',
        keywords: ['anki alternative', 'better than anki', 'anki replacement', 'spaced repetition app', 'modern flashcard app']
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
        ctaSubtitle: 'Join the thousands switching from Quizlet to Masterly AI.',
        keywords: ['quizlet alternative', 'better than quizlet', 'quizlet replacement', 'free study app', 'study without ads']
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
        ctaSubtitle: 'Start using the world&apos;s most effective study method today.',
        keywords: ['spaced repetition', 'memory technique', 'fsrs algorithm', 'long term memory', 'study schedule']
    },
    {
        slug: 'active-recall',
        title: 'Active Recall',
        subtitle: 'Study Smarter, Not Harder',
        heroTitle: 'Master Active Recall',
        heroSubtitle: 'The most effective learning technique backed by science. Test yourself instead of passively re-reading to boost retention by 50%.',
        description: 'Learn faster with active recall - the science-backed study method proven to improve memory retention',
        features: [
            {
                title: 'Question-Based Learning',
                description: 'AI generates targeted questions from your materials.',
                icon: 'Brain'
            },
            {
                title: 'Immediate Feedback',
                description: 'Know instantly what you know and what needs work.',
                icon: 'Zap'
            },
            {
                title: 'Progress Tracking',
                description: 'See your mastery level increase with every session.',
                icon: 'BarChart'
            },
            {
                title: 'Adaptive Difficulty',
                description: 'Questions adjust based on your performance.',
                icon: 'Activity'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Content',
                description: 'Add your study materials in any format'
            },
            {
                number: '02',
                title: 'Answer Questions',
                description: 'Test yourself with AI-generated active recall questions'
            },
            {
                number: '03',
                title: 'Review Mistakes',
                description: 'Focus on weak areas for maximum improvement'
            }
        ],
        faqs: [
            {
                question: 'What is active recall?',
                answer: 'Active recall is a learning technique where you actively retrieve information from memory, rather than passively reviewing it. This strengthens neural pathways and improves long-term retention.'
            },
            {
                question: 'How is this better than re-reading?',
                answer: 'Studies show active recall is 50-100% more effective than passive re-reading. It forces your brain to work harder, creating stronger memories.'
            }
        ],
        ctaTitle: 'Start Using Active Recall Today',
        ctaSubtitle: 'Transform how you study with science-backed techniques.',
        keywords: ['active recall', 'testing effect', 'study technique', 'memory retention', 'evidence based learning']
    },
    {
        slug: 'medical-school-study-app',
        title: 'Medical School Study App',
        subtitle: 'Built for Med Students',
        heroTitle: 'The Ultimate Medical School Study App',
        heroSubtitle: 'Master anatomy, pharmacology, and pathology with AI-powered flashcards designed specifically for medical students.',
        description: 'AI-powered study app designed for medical students to master complex medical concepts',
        features: [
            {
                title: 'Medical Content AI',
                description: 'Trained on medical terminology and concepts for accurate cards.',
                icon: 'Brain'
            },
            {
                title: 'Image Recognition',
                description: 'Upload anatomy diagrams and get labeled flashcards.',
                icon: 'Image'
            },
            {
                title: 'USMLE Prep',
                description: 'Optimized for Step 1, Step 2, and Step 3 preparation.',
                icon: 'CheckCircle'
            },
            {
                title: 'Clinical Cases',
                description: 'Practice with case-based questions and scenarios.',
                icon: 'FileText'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Lectures',
                description: 'Add your medical school lectures and textbook PDFs'
            },
            {
                number: '02',
                title: 'AI Creates Cards',
                description: 'Get comprehensive flashcards covering all key concepts'
            },
            {
                number: '03',
                title: 'Ace Your Exams',
                description: 'Study efficiently with spaced repetition and active recall'
            }
        ],
        faqs: [
            {
                question: 'Is this suitable for USMLE preparation?',
                answer: 'Absolutely! Many medical students use Masterly for USMLE Step 1, 2, and 3 preparation. Our AI understands medical terminology and creates high-yield questions.'
            },
            {
                question: 'Can it handle anatomy images?',
                answer: 'Yes! Upload anatomy diagrams, histology slides, or radiology images and our AI will create relevant flashcards with proper labeling.'
            }
        ],
        ctaTitle: 'Join Thousands of Med Students',
        ctaSubtitle: 'Start studying smarter for your medical exams today.',
        keywords: ['medical school study app', 'med school flashcards', 'usmle prep', 'medical student app', 'anatomy flashcards']
    },
    {
        slug: 'law-school-study-app',
        title: 'Law School Study App',
        subtitle: 'Master Case Law Faster',
        heroTitle: 'AI Study App for Law Students',
        heroSubtitle: 'Turn case briefs, statutes, and legal concepts into flashcards. Perfect for bar exam prep and law school success.',
        description: 'Study app designed for law students to master case law, statutes, and legal concepts efficiently',
        features: [
            {
                title: 'Case Brief Analysis',
                description: 'AI extracts key holdings, facts, and reasoning from cases.',
                icon: 'FileText'
            },
            {
                title: 'Bar Exam Ready',
                description: 'Optimized for MBE, MEE, and state bar preparation.',
                icon: 'CheckCircle'
            },
            {
                title: 'Legal Terminology',
                description: 'Trained on legal language for accurate flashcards.',
                icon: 'Brain'
            },
            {
                title: 'Rule Memorization',
                description: 'Perfect for memorizing rules, elements, and tests.',
                icon: 'Repeat'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Cases',
                description: 'Add your case briefs, outlines, and study materials'
            },
            {
                number: '02',
                title: 'AI Extracts Rules',
                description: 'Get flashcards with holdings, rules, and key facts'
            },
            {
                number: '03',
                title: 'Master the Law',
                description: 'Review with spaced repetition until it sticks'
            }
        ],
        faqs: [
            {
                question: 'Does this work for bar exam prep?',
                answer: 'Yes! Many law students use Masterly for bar exam preparation. It&apos;s perfect for memorizing rules, elements, and case holdings across all subjects.'
            },
            {
                question: 'Can it handle case briefs?',
                answer: 'Absolutely! Upload your case briefs and our AI will extract the key holdings, facts, reasoning, and create targeted flashcards for review.'
            }
        ],
        ctaTitle: 'Ace Law School & The Bar',
        ctaSubtitle: 'Join law students studying smarter with AI.',
        keywords: ['law school study app', 'bar exam prep', 'law student flashcards', 'case law study', 'legal study tools']
    },
    {
        slug: 'exam-preparation-app',
        title: 'Exam Preparation App',
        subtitle: 'Ace Any Exam',
        heroTitle: 'Your Complete Exam Prep Solution',
        heroSubtitle: 'From midterms to finals, professional certifications to standardized tests - prepare efficiently with AI-powered study tools.',
        description: 'Comprehensive exam preparation app with AI flashcards, quizzes, and spaced repetition',
        features: [
            {
                title: 'Any Subject',
                description: 'Works for any exam - academic, professional, or standardized.',
                icon: 'BookOpen'
            },
            {
                title: 'Smart Scheduling',
                description: 'AI creates a personalized study schedule for your exam date.',
                icon: 'Calendar'
            },
            {
                title: 'Practice Tests',
                description: 'Generate unlimited practice questions from your materials.',
                icon: 'FileText'
            },
            {
                title: 'Weak Spot Analysis',
                description: 'Identify and focus on your weakest areas.',
                icon: 'Activity'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Set Your Exam Date',
                description: 'Tell us when your exam is and what you need to study'
            },
            {
                number: '02',
                title: 'Upload Materials',
                description: 'Add all your study materials - notes, textbooks, slides'
            },
            {
                number: '03',
                title: 'Follow Your Plan',
                description: 'Study daily with AI-optimized review sessions'
            }
        ],
        faqs: [
            {
                question: 'What types of exams can I prepare for?',
                answer: 'Any exam! Students use Masterly for college exams, professional certifications (CPA, CFA, PMP), standardized tests (GRE, GMAT, LSAT), medical boards (USMLE, COMLEX), and more.'
            },
            {
                question: 'How far in advance should I start?',
                answer: 'We recommend starting at least 2-4 weeks before your exam for best results. Our spaced repetition algorithm works best with consistent daily review.'
            }
        ],
        ctaTitle: 'Start Your Exam Prep Journey',
        ctaSubtitle: 'Join students who improved their grades by 20%+.',
        keywords: ['exam preparation app', 'test prep', 'study for exams', 'exam flashcards', 'test study tool']
    },
    {
        slug: 'notes-to-flashcards',
        title: 'Notes to Flashcards',
        subtitle: 'Convert Notes Instantly',
        heroTitle: 'Turn Your Notes into Flashcards',
        heroSubtitle: 'Stop manually creating flashcards from your notes. Upload once, get perfect study cards in seconds with AI.',
        description: 'Automatically convert your study notes into flashcards using AI technology',
        features: [
            {
                title: 'Any Note Format',
                description: 'Works with typed notes, handwritten PDFs, or images.',
                icon: 'Files'
            },
            {
                title: 'Smart Parsing',
                description: 'AI understands your note structure and organization.',
                icon: 'Brain'
            },
            {
                title: 'Bulk Conversion',
                description: 'Convert entire notebooks or semesters of notes at once.',
                icon: 'Layers'
            },
            {
                title: 'Edit & Refine',
                description: 'Review and customize generated flashcards as needed.',
                icon: 'Wand2'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Notes',
                description: 'Add your class notes in any format'
            },
            {
                number: '02',
                title: 'AI Converts',
                description: 'Watch as AI creates flashcards from key concepts'
            },
            {
                number: '03',
                title: 'Start Learning',
                description: 'Review with spaced repetition for maximum retention'
            }
        ],
        faqs: [
            {
                question: 'Can it read my handwriting?',
                answer: 'Yes! Our OCR technology can read most handwritten notes. For best results, ensure your handwriting is reasonably clear and well-lit in photos.'
            },
            {
                question: 'What if my notes are messy or unorganized?',
                answer: 'Our AI is trained to extract key concepts even from unstructured notes. It identifies important information regardless of formatting.'
            }
        ],
        ctaTitle: 'Transform Your Notes Today',
        ctaSubtitle: 'Stop wasting time on manual flashcard creation.',
        keywords: ['notes to flashcards', 'convert notes', 'study from notes', 'notes flashcards', 'handwritten notes']
    },
    {
        slug: 'ai-quiz-generator',
        title: 'AI Quiz Generator',
        subtitle: 'Test Your Knowledge',
        heroTitle: 'AI-Powered Quiz Generator',
        heroSubtitle: 'Create unlimited practice quizzes from any study material. Perfect for self-testing and exam preparation.',
        description: 'Generate practice quizzes automatically from your study materials using AI',
        features: [
            {
                title: 'Multiple Question Types',
                description: 'Multiple choice, true/false, short answer, and more.',
                icon: 'FileText'
            },
            {
                title: 'Difficulty Levels',
                description: 'Choose from easy, medium, or hard questions.',
                icon: 'Activity'
            },
            {
                title: 'Instant Grading',
                description: 'Get immediate feedback on your answers.',
                icon: 'CheckCircle'
            },
            {
                title: 'Unlimited Quizzes',
                description: 'Generate as many practice quizzes as you need.',
                icon: 'Repeat'
            }
        ],
        steps: [
            {
                number: '01',
                title: 'Upload Content',
                description: 'Add your study materials or textbook chapters'
            },
            {
                number: '02',
                title: 'Generate Quiz',
                description: 'AI creates a comprehensive quiz in seconds'
            },
            {
                number: '03',
                title: 'Take & Review',
                description: 'Test yourself and review detailed explanations'
            }
        ],
        faqs: [
            {
                question: 'How many questions can I generate?',
                answer: 'There&apos;s no limit! Generate as many quizzes as you need. Each quiz can have 5-50 questions depending on your preference.'
            },
            {
                question: 'Does it provide explanations?',
                answer: 'Yes! Every question comes with a detailed explanation of the correct answer to help you learn from mistakes.'
            }
        ],
        ctaTitle: 'Start Creating Quizzes Now',
        ctaSubtitle: 'Test yourself with unlimited AI-generated practice questions.',
        keywords: ['ai quiz generator', 'quiz maker', 'practice questions', 'test generator', 'study quiz']
    }
];
