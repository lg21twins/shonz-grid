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
- Use these exact Korean forms for F1 names:
  Teams: Red Bull=레드불, Ferrari=페라리, McLaren=맥라렌, Mercedes=메르세데스, Aston Martin=애스턴 마틴, Alpine=알파인, Williams=윌리엄스, RB=RB, Haas=하스, Sauber/Audi=자우버/아우디, Cadillac=캐딜락
  Drivers: Verstappen=베르스타펜, Hamilton=해밀턴, Leclerc=르클레르, Norris=노리스, Piastri=피아스트리, Russell=러셀, Sainz=사인츠, Alonso=알론소, Stroll=스트롤, Gasly=가슬리, Ocon=오콘, Albon=알본, Tsunoda=츠노다, Lawson=로손, Hulkenberg=휠켄베르그, Bearman=베어만, Colapinto=콜라핀토, Doohan=두한, Antonelli=안토넬리, Hadjar=하자르, Bortoleto=보르톨레토
  Other: Honda=혼다, Australian GP=호주 그랑프리, Grand Prix=그랑프리
- Keep proper nouns in their Korean form, never mix Korean and English characters in a single word
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
