/* ── Keyword-based Article Categorization ── */

type Category =
  | "데일리 브리핑"
  | "기술 해설"
  | "레이스 위켄드"
  | "드라이버 & 팀"
  | "속보";

const CATEGORY_KEYWORDS: Record<Exclude<Category, "데일리 브리핑">, string[]> =
  {
    속보: [
      "breaking",
      "confirmed",
      "official",
      "announced",
      "penalty",
      "disqualified",
      "banned",
      "suspended",
      "signs deal",
      "just in",
    ],
    "레이스 위켄드": [
      "race",
      "qualifying",
      "sprint",
      "practice",
      "fp1",
      "fp2",
      "fp3",
      "grid",
      "podium",
      "pole position",
      "fastest lap",
      "pit stop",
      "safety car",
      "grand prix",
      "race result",
      "starting grid",
      "silverstone",
      "monza",
      "spa",
      "monaco",
      "suzuka",
      "interlagos",
      "albert park",
      "bahrain",
      "jeddah",
      "miami",
      "montreal",
      "barcelona",
      "zandvoort",
      "singapore",
      "las vegas",
      "abu dhabi",
      "imola",
      "hungaroring",
      "baku",
    ],
    "기술 해설": [
      "technical",
      "aerodynamic",
      "aero",
      "engine",
      "power unit",
      "regulation",
      "design",
      "upgrade",
      "floor",
      "diffuser",
      "sidepod",
      "suspension",
      "drs",
      "active aero",
      "ground effect",
      "wind tunnel",
      "cfd",
      "mgu-k",
      "mgu-h",
      "battery",
      "ers",
      "technical directive",
    ],
    "드라이버 & 팀": [
      "contract",
      "signing",
      "lineup",
      "team principal",
      "team boss",
      "seat",
      "replacement",
      "verstappen",
      "hamilton",
      "leclerc",
      "norris",
      "piastri",
      "russell",
      "sainz",
      "alonso",
      "stroll",
      "gasly",
      "ocon",
      "perez",
      "bottas",
      "hulkenberg",
      "lawson",
      "bearman",
      "antonelli",
      "hadjar",
      "colapinto",
      "bortoleto",
      "albon",
    ],
  };

export function categorizeArticle(
  title: string,
  description: string,
): Category {
  const text = `${title} ${description}`.toLowerCase();

  let bestCategory: Category = "데일리 브리핑";
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter((kw) => text.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category as Category;
    }
  }

  return bestCategory;
}
