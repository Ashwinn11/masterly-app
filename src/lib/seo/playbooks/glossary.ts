import { SEOPageData, commonFAQs } from '../shared';

export const glossaryPages: SEOPageData[] = [
    {
        slug: 'what-is-the-forgetting-curve',
        title: 'What is the Forgetting Curve?',
        subtitle: 'The Science of Memory Loss',
        heroTitle: 'Understanding the Forgetting Curve',
        heroSubtitle: 'Learn how your brain loses information over time and how to stop it using the science of spaced repetition.',
        description: 'A complete guide to the Ebbinghaus Forgetting Curve. Understand why you forget and how to use spaced repetition to retain 90% of what you learn.',
        keywords: [
            'forgetting curve', 'ebbinghaus forgetting curve', 'memory loss science', 'overcoming the forgetting curve',
            'spaced repetition curve', 'memory retention graph', 'how to remember what you study'
        ],
        features: [
            { title: 'Exponential Decay', description: 'Memory retention drops exponentially immediately after learning.', icon: 'TrendingDown' },
            { title: 'The Fix', description: 'Active recall interrupts the forgetting process, resetting the curve.', icon: 'RefreshCcw' },
            { title: 'Spaced Repetition', description: 'Strategically timed reviews flatten the curve over time.', icon: 'Clock' },
            { title: 'Masterly Solution', description: 'Our FSRS algorithm handles the math for you automatically.', icon: 'CheckCircle' }
        ],
        steps: [
            { number: '01', title: 'Learn Material', description: 'Store information in your short-term memory' },
            { number: '02', title: 'Immediate Review', description: 'Review within 24 hours to prevent the first steep drop' },
            { number: '03', title: 'Spaced Reviews', description: 'Review at increasing intervals to move to long-term memory' }
        ],
        faqs: [
            { question: 'Who discovered the Forgetting Curve?', answer: 'It was hypothesized by German psychologist Hermann Ebbinghaus in 1885 after extensive self-experimentation.' },
            { question: 'How fast do we forget information?', answer: 'Without review, research suggests we lose about 50% of new information within an hour and up to 70% within 24 hours.' },
            { question: 'Can you defeat the Forgetting Curve?', answer: 'Yes! By reviewing information just before you forget it (spaced repetition), you can strengthen the specific neural pathways and "flatten" the curve.' },
            { question: 'Does Masterly use this science?', answer: 'Yes, Masterly is built entirely around defeating the forgetting curve using the advanced FSRS algorithm.' },
            commonFAQs.spacedRepetition,
            commonFAQs.howItWorks,
            commonFAQs.isFree
        ],
        ctaTitle: 'Beat the Forgetting Curve',
        ctaSubtitle: 'Use Masterly to retain 90% of what you learn.',
        relatedPages: ['spaced-repetition', 'active-recall', 'what-is-the-leitner-system']
    },
    {
        slug: 'what-is-the-leitner-system',
        title: 'What is the Leitner System?',
        subtitle: 'The Original Spaced Repetition',
        heroTitle: 'Understanding the Leitner System',
        heroSubtitle: 'The classic "shoebox" method that revolutionized learning. See how it works and why digital algorithms are even better.',
        description: 'Learn about the Leitner System of flashcards. A simple, effective method for learning that paved the way for modern spaced repetition apps.',
        keywords: [
            'leitner system', 'leitner box method', 'flashcard boxes', 'spaced repetition analog',
            'sebastian leitner', 'how to use leitner boxes', 'manual spaced repetition'
        ],
        features: [
            { title: 'Box Method', description: 'Cards move to higher boxes when answered correctly.', icon: 'Box' },
            { title: 'Self-Correction', description: 'Incorrect cards return to Box 1, ensuring mastery.', icon: 'RotateCcw' },
            { title: 'Visual Progress', description: 'See your knowledge grow as cards move up the chain.', icon: 'BarChart' },
            { title: 'Digital Upgrade', description: 'Masterly automates this process so you don\'t need physical boxes.', icon: 'Smartphone' }
        ],
        steps: [
            { number: '01', title: 'Box 1: Every Day', description: 'New and difficult cards that need constant review' },
            { number: '02', title: 'Box 2: Every 3 Days', description: 'Cards you know reasonably well' },
            { number: '03', title: 'Box 3: Weekly', description: 'Cards you have mastered and just need maintenance' }
        ],
        faqs: [
            { question: ' Who invented the Leitner System?', answer: 'It was proposed by German science journalist Sebastian Leitner in the 1970s.' },
            { question: 'Do I need physical boxes?', answer: 'Traditionally yes, but apps like Masterly simulate this system digitally, which is much more efficient and portable.' },
            { question: 'What happens if I get a card wrong in Box 3?', answer: 'In the strict Leitner system, it goes all the way back to Box 1. This penalty ensures you strictly main mastery.' },
            { question: 'Is FSRS different from Leitner?', answer: 'Yes. Leitner is a rough approximation using fixed intervals (boxes). FSRS is a mathematical model that calculates precise review times based on your unique memory strength.' },
            commonFAQs.spacedRepetition,
            commonFAQs.howItWorks
        ],
        ctaTitle: 'Upgrade from Shoeboxes to AI',
        ctaSubtitle: 'Let Masterly handle the scheduling for you.',
        relatedPages: ['what-is-the-forgetting-curve', 'spaced-repetition', 'anki-alternative']
    },
    {
        slug: 'what-is-metacognition',
        title: 'What is Metacognition?',
        subtitle: 'Thinking About Thinking',
        heroTitle: 'Metacognition in Learning',
        heroSubtitle: 'Unlock the power of "thinking about thinking." Learn how self-awareness can make you a more efficient and effective student.',
        description: 'What is metacognition? Understand the role of self-awareness in learning and how to use metacognitive strategies to improve your grades.',
        keywords: [
            'what is metacognition', 'metacognitive strategies', 'thinking about thinking', 'learning how to learn',
            'self regulated learning', 'study reflection', 'metacognition examples'
        ],
        features: [
            { title: 'Planning', description: 'Setting goals and selecting the right strategies before starting.', icon: 'Target' },
            { title: 'Monitoring', description: 'Tracking your understanding while you study.', icon: 'Eye' },
            { title: 'Evaluation', description: 'Reflecting on what worked and what didn\'t after studying.', icon: 'ClipboardCheck' },
            { title: 'Optimization', description: 'Adjusting your methods for better results next time.', icon: 'Settings' }
        ],
        steps: [
            { number: '01', title: 'Assess Task', description: 'What do I need to learn and how will I be tested?' },
            { number: '02', title: 'Select Strategy', description: 'Choosing active recall over passive reading' },
            { number: '03', title: 'Self-Test', description: 'Constant checking: "Do I actually know this?"' }
        ],
        faqs: [
            { question: 'Why is metacognition important?', answer: 'Students with strong metacognition are better at spotting gaps in their knowledge. They don\'t just "study hard"—they study efficiently.' },
            { question: 'How can I improve my metacognition?', answer: 'Pause frequently to ask yourself: "Do I really understand this?" and "Could I explain this to someone else?".' },
            { question: 'Does Masterly help with metacognition?', answer: 'Yes, by providing immediate feedback on active recall questions and showing clear progress stats, Masterly forces you to confront what you don\'t know.' },
            { question: 'Is highlighting a metacognitive strategy?', answer: 'Usually no. Highlighting is often passive. A better strategy is to read a page, close the book, and try to summarize it mentally.' },
            commonFAQs.howItWorks,
            commonFAQs.isFree
        ],
        ctaTitle: 'Study with Self-Awareness',
        ctaSubtitle: 'Use Masterly to track what you really know.',
        relatedPages: ['active-recall', 'what-is-the-forgetting-curve', 'exam-preparation-app']
    },
    {
        slug: 'what-is-interleaved-practice',
        title: 'What is Interleaved Practice?',
        subtitle: 'Mix Up Your Learning',
        heroTitle: 'The Power of Interleaved Practice',
        heroSubtitle: 'Why studying one topic at a time is holding you back. Discover the science of mixing subjects for stronger neural connections.',
        description: 'What is interleaved practice? Learn why mixing up your study topics (interleaving) is more effective than blocked practice for long-term retention.',
        keywords: [
            'interleaved practice', 'interleaving vs blocking', 'mixed practice study', 'varied practice',
            'study techniques science', 'how to interleave study', 'blocked practice vs interleaved'
        ],
        features: [
            { title: 'Problem Discrimination', description: 'Learning when to use which strategy/formula.', icon: 'GitBranch' },
            { title: 'Higher Retention', description: 'Significantly better long-term test results than blocking.', icon: 'TrendingUp' },
            { title: 'Contextual Learning', description: 'Building connections between related topics.', icon: 'Link' },
            { title: 'Harder but Better', description: 'Feels more difficult in the moment, but produces better results.', icon: 'Dumbbell' }
        ],
        steps: [
            { number: '01', title: 'Mix Topics', description: 'Don\'t do all "Type A" problems then "Type B". Mix them up.' },
            { number: '02', title: 'Switch Frequently', description: 'Change subjects or problem types every 20-30 minutes' },
            { number: '03', title: 'Force Recall', description: 'Your brain has to reload the strategy each time, strengthening it' }
        ],
        faqs: [
            { question: 'What is the difference between blocking and interleaving?', answer: 'Blocking is studying one topic until mastery (AAAA, BBBB). Interleaving is mixing them up (ABC, BCA, CAB).' },
            { question: 'Why does it feel harder?', answer: 'Interleaving prevents "rote" answers. You have to actively identify the problem type each time, which requires more mental effort but leads to deeper learning.' },
            { question: 'Can I do this with Masterly?', answer: 'Yes! You can choose to "Review All" or create a filtered deck that combines cards from multiple subjects to force interleaving.' },
            { question: 'Is it good for math?', answer: 'It is especially good for math. Students who interleave math practice score up to 75% higher on final exams than those who block practice.' },
            commonFAQs.howItWorks,
            commonFAQs.spacedRepetition
        ],
        ctaTitle: 'Stop Blocked Practice',
        ctaSubtitle: 'Start mixing up your study sessions with Masterly.',
        relatedPages: ['what-is-metacognition', 'active-recall', 'ai-quiz-generator']
    }
];
