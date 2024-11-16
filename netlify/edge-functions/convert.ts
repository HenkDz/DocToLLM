import { Context } from '@netlify/edge-functions';
import { extractContent } from '../utils/extractor';

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the content with appropriate headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DocToLLM Bot (https://doctollm.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }

    const html = await response.text();

    // For demo purposes, returning mock data
    // In production, you would use the extractContent function
    const result = {
      title: 'React Documentation',
      overview: 'React is a JavaScript library for building user interfaces. This documentation covers the core concepts and advanced features of React.',
      keyPoints: [
        'Component-Based Architecture',
        'Virtual DOM for Efficient Updates',
        'Declarative UI Development',
        'Rich Ecosystem and Community',
      ],
      sections: [
        {
          title: 'Getting Started',
          content: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
        },
        {
          title: 'Core Concepts',
          content: 'Learn about fundamental React concepts including Components, Props, State, and Lifecycle Methods. Understanding these concepts is crucial for building React applications.',
        },
      ],
      limitations: 'This documentation assumes basic familiarity with JavaScript and web development concepts.',
      sourceUrl: url,
    };

    return new Response(
      JSON.stringify(result),
      { 
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        }
      }
    );
  } catch (error) {
    console.error('Conversion error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process documentation' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}