import { comparisonPages } from './playbooks/comparisons';
import { personaPages } from './playbooks/personas';
import { templatePages } from './playbooks/templates';
import { definitionPages } from './playbooks/definitions';
import { glossaryPages } from './playbooks/glossary';
import { SEOPageData } from './shared';

export * from './shared';

export const seoPages: SEOPageData[] = [
    ...templatePages,
    ...comparisonPages,
    ...definitionPages,
    ...personaPages,
    ...glossaryPages
];
