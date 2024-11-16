import { format } from 'date-fns';
import { ConversionResult } from '../types';

export function generateMarkdown(result: ConversionResult): string {
  return `# ${result.title}

## Overview
${result.overview}

## Key Points
${result.keyPoints.map(point => `- ${point}`).join('\n')}

## Important Sections
${result.sections.map(section => `### ${section.title}\n${section.content}`).join('\n\n')}

## Context and Limitations
${result.limitations}

## References
- Original URL: ${result.sourceUrl}
- Generated: ${format(new Date(), 'PPpp')}
- Generated by [DocToLLM](https://doctollm.com)`;
}