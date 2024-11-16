export interface ConversionResult {
  title: string;
  overview: string;
  keyPoints: string[];
  sections: { title: string; content: string }[];
  limitations: string;
  sourceUrl: string;
}