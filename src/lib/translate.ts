/* ── Claude API Translation & Article Generation ── */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface ArticleContent {
  title: string;
  description: string;
  body: string[]; // Array of paragraphs for the article body
}

/**
 * Translate title/description to Korean AND generate a full Korean article body.
 * Falls back to the original English text on any error.
 */
export async function translateAndGenerate(
  title: string,
  description: string,
  sourceName: string,
): Promise<ArticleContent> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `You are a Korean F1 news journalist for "SHONZ GRID". Based on the English F1 news below, write a Korean article.

Rules:
- Translate the title and description into natural Korean
- Write 3-4 paragraphs of article body in Korean (each paragraph 2-3 sentences)
- Use commonly accepted Korean forms for F1 terms (e.g., 베르스타펜, 해밀턴, 르클레르, 페라리, 맥라렌, 레드불)
- Write as if reporting news, professional and informative tone
- The body should expand on the title/description with relevant F1 context
- Do NOT make up specific quotes or statistics that aren't in the source

Return ONLY a JSON object with these keys:
- "title": Korean translated title
- "description": Korean translated description (1-2 sentences)
- "body": array of 3-4 Korean paragraph strings

Source: ${sourceName}
Title: ${title}
Description: ${description}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { title, description, body: [description] };

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      title: parsed.title || title,
      description: parsed.description || description,
      body: Array.isArray(parsed.body) ? parsed.body : [parsed.description || description],
    };
  } catch {
    console.error("Translation/generation failed, using original text");
    return { title, description, body: [description] };
  }
}
