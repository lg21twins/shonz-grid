import { getArticles, getArticlesByKeywords } from "@/lib/notion";
import {
  DRIVERS,
  CONSTRUCTORS,
  TEAM_COLORS,
  getNextRace,
  getDaysUntilRace,
} from "@/data/f1-2026";
import { RACE_KEYWORDS } from "@/data/race-keywords";
import { HomeClient } from "./HomeClient";

export const revalidate = 300;

export default async function Home() {
  const nextRace = getNextRace();
  const daysUntil = getDaysUntilRace();

  // Fetch articles in parallel
  const [articles, techArticles, gpArticlesRaw] = await Promise.all([
    getArticles(undefined, 10),
    getArticles("기술 해설", 3),
    getArticlesByKeywords(RACE_KEYWORDS[nextRace.round] ?? [], 4),
  ]);

  // Headline (first article)
  const headline = articles[0]
    ? {
        slug: articles[0].slug,
        title: articles[0].title,
        description: articles[0].description,
        source: articles[0].source,
        date: articles[0].date,
        thumbnail: articles[0].thumbnail,
      }
    : null;

  // Daily briefing (next 4 articles)
  const briefing = articles.slice(1, 5).map((a) => ({
    slug: a.slug,
    category: a.category,
    title: a.title,
    description: a.description,
    thumbnail: a.thumbnail,
  }));

  // Tech featured (first tech article)
  const techFeatured = techArticles[0]
    ? {
        slug: techArticles[0].slug,
        title: techArticles[0].title,
        description: techArticles[0].description,
        thumbnail: techArticles[0].thumbnail,
      }
    : null;

  // Tech more (next 2 tech articles)
  const techMore = techArticles.slice(1, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    thumbnail: a.thumbnail,
  }));

  // GP article collection
  const gpData = {
    flag: nextRace.flag,
    gp: nextRace.gp,
    fullDate: nextRace.fullDate,
    articles: gpArticlesRaw.map((a) => ({
      slug: a.slug,
      title: a.title,
      source: a.source,
      date: a.date,
      thumbnail: a.thumbnail,
    })),
  };

  // Race schedule
  const raceSchedule = {
    gp: nextRace.gp,
    circuit: nextRace.circuit,
    city: nextRace.city,
    daysUntil,
    sessions: nextRace.sessions,
  };

  return (
    <HomeClient
      headline={headline}
      briefing={briefing}
      gpData={gpData}
      raceSchedule={raceSchedule}
      techFeatured={techFeatured}
      techMore={techMore}
      drivers={DRIVERS.slice(0, 5)}
      constructors={CONSTRUCTORS.slice(0, 5)}
      teamColors={TEAM_COLORS}
    />
  );
}
