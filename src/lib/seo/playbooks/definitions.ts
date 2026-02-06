import { SEOPageData, commonFAQs } from '../shared';

export const definitionPages: SEOPageData[] = [
    {
        slug: 'spaced-repetition',
        title: 'Spaced Repetition',
        subtitle: 'Learn Once, Remember Forever',
        heroTitle: 'Spaced Repetition System',
        heroSubtitle: 'Master the science of memory. Our advanced FSRS algorithm calculates the perfect time to review each card so you never forget.',
        description: 'Improve long-term memory with Masterly\'s scientific spaced repetition. Learn faster and remember more with the most efficient algorithm available.',
        keywords: [
            'spaced repetition', 'spaced repetition app', 'fsrs algorithm', 'ebbinghaus forgetting curve',
            'memory study app', 'long term retention', 'active recall and spaced repetition', 'study schedule'
        ],
        features: [
            { title: 'FSRS Algorithm', description: 'The most modern and efficient spaced repetition algorithm available.', icon: 'Activity' },
            { title: 'Optimized Schedules', description: 'Your study sessions are automatically planned for maximum retention.', icon: 'Calendar' },
            { title: 'Heatmaps & Stats', description: 'Visualize your learning journey and stay motivated.', icon: 'BarChart' },
            { title: 'Active Recall', description: 'Designed specifically to trigger deep memory retrieval.', icon: 'BrainCircuit' }
        ],
        steps: [
            { number: '01', title: 'Learn New Cards', description: 'Initial exposure to your study material' },
            { number: '02', title: 'First Review', description: 'Review shortly after learning to combat the forgetting curve' },
            { number: '03', title: 'Increasing Intervals', description: 'Study at wider gaps as the memory becomes more permanent' }
        ],
        faqs: [
            { question: 'What is Spaced Repetition?', answer: 'Spaced repetition is a learning technique that involves reviewing information at increasing intervals. Each time you recall a piece of information, the interval before the next review gets longer.' },
            { question: 'What is the FSRS algorithm?', answer: 'FSRS (Free Spaced Repetition Scheduler) is a modern, neural-network-inspired algorithm that predicts exactly when you are about to forget something. It is significantly more accurate than older systems.' },
            { question: 'How much time will I save?', answer: 'Research shows spaced repetition can cut your study time by 50% while improving long-term retention by over 90%.' },
            { question: 'What happens if I miss a day?', answer: 'Don\'t worry! The algorithm is adaptive. It will re-adjust your schedule to ensure you get back on track efficiently without being overwhelmed by a "backlog".' },
            { question: 'Is this better than normal study?', answer: 'Passive re-reading is the least effective way to study. Spaced repetition combined with active recall is considered the "gold standard" of learning science.' },
            commonFAQs.howItWorks,
            { question: 'Can I use this for non-academic subjects?', answer: 'Absolutely. Spaced repetition works for languages, coding, hobbies, and even professional certifications.' },
            { question: 'Do I have to think about the schedule?', answer: 'No, Masterly handles everything. You just open the app and click "Study"—the algorithm tells you exactly what needs review.' },
            commonFAQs.devices,
            { question: 'Is it hard to set up?', answer: 'Zero setup required. Just create your cards or let our AI do it, and the system automatically starts managing your schedule.' }
        ],
        ctaTitle: 'Never Forget What You Learn',
        ctaSubtitle: 'Start using the world\'s most effective study method today.',
        relatedPages: ['active-recall', 'anki-alternative', 'exam-preparation-app']
    },
    {
        slug: 'active-recall',
        title: 'Active Recall',
        subtitle: 'Study Smarter, Not Harder',
        heroTitle: 'Master Active Recall',
        heroSubtitle: 'The most effective learning technique backed by science. Test yourself instead of passively re-reading to boost retention by 50%.',
        description: 'Boost your grades with active recall study methods. Masterly\'s AI-powered platform makes practicing active recall easy and effective for all subjects.',
        keywords: [
            'active recall', 'active recall study method', 'testing effect', 'how to study effectively',
            'memory techniques', 'study smarter not harder', 'active learning app', 'exam prep tools'
        ],
        features: [
            { title: 'Question-Based Learning', description: 'AI generates targeted questions from your materials.', icon: 'Brain' },
            { title: 'Immediate Feedback', description: 'Know instantly what you know and what needs work.', icon: 'Zap' },
            { title: 'Progress Tracking', description: 'See your mastery level increase with every session.', icon: 'BarChart' },
            { title: 'Adaptive Difficulty', description: 'Questions adjust based on your performance.', icon: 'Activity' }
        ],
        steps: [
            { number: '01', title: 'Upload Content', description: 'Add your study materials in any format' },
            { number: '02', title: 'Answer Questions', description: 'Test yourself with AI-generated active recall questions' },
            { number: '03', title: 'Review Mistakes', description: 'Focus on weak areas for maximum improvement' }
        ],
        faqs: [
            { question: 'What is Active Recall?', answer: 'Active recall is the practice of retrieving information from your brain instead of just reading it. By forcing your brain to "search" for the answer, you strengthen the neural pathways associated with that memory.' },
            { question: 'Why is active recall better than highlighting?', answer: 'Highlighting or re-reading gives you a "fluency illusion"—you think you know it because it looks familiar. Active recall reveals what you actually know versus what you just recognize.' },
            { question: 'How does Masterly help with active recall?', answer: 'Masterly uses AI to turn your passive notes into active questions. It creates the "test" for you, so you can spend your time practicing instead of preparing.' },
            { question: 'Is it harder than normal studying?', answer: 'Yes, it requires more mental effort. However, this "desirable difficulty" is exactly why it works so well. You learn in 1 hour what usually takes 3 hours of re-reading.' },
            { question: 'Can I use it for essay-based subjects?', answer: 'Definitely. For subjects like history or literature, Masterly generates open-ended conceptual questions that require deeper thinking.' },
            { question: 'What are some active recall examples?', answer: 'Flashcards, practice tests, and the Feynman technique (teaching it to someone else) are all forms of active recall.' },
            commonFAQs.howItWorks,
            commonFAQs.devices,
            commonFAQs.privacy,
            { question: 'Is after-class review considered active recall?', answer: 'Yes, if you try to summarize the lecture without looking at your notes, that is highly effective active recall.' }
        ],
        ctaTitle: 'Start Using Active Recall Today',
        ctaSubtitle: 'Transform how you study with science-backed techniques.',
        relatedPages: ['spaced-repetition', 'ai-quiz-generator', 'exam-preparation-app']
    }
];
