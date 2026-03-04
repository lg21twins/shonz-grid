import { getArticles, getArticlesByKeywords, getSnsClips, getStandings } from "@/lib/notion";
import {
  DRIVERS,
  CONSTRUCTORS,
  TEAM_COLORS,
  DRIVER_ID_MAP,
  CONSTRUCTOR_ID_MAP,
  getNextRace,
  getDaysUntilRace,
} from "@/data/f1-2026";
import { RACE_KEYWORDS } from "@/data/race-keywords";
import { HomeClient } from "./HomeClient";

export const revalidate = 300;

export default async function Home() {
  const nextRace = getNextRace();
  const daysUntil = getDaysUntilRace();

  // Fetch articles + standings in parallel
  const [articles, techArticles, gpArticlesRaw, snsClips, driverStandings, constructorStandings] = await Promise.all([
    getArticles(undefined, 10),
    getArticles("기술 해설", 3),
    getArticlesByKeywords(RACE_KEYWORDS[nextRace.round] ?? [], 4),
    getSnsClips(10),
    getStandings("driver"),
    getStandings("constructor"),
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

  // Tech articles — exclude headline to avoid duplication
  const headlineSlug = articles[0]?.slug;
  const techFiltered = techArticles.filter((a) => a.slug !== headlineSlug);

  // Tech featured (first tech article)
  const techFeatured = techFiltered[0]
    ? {
        slug: techFiltered[0].slug,
        title: techFiltered[0].title,
        description: techFiltered[0].description,
        thumbnail: techFiltered[0].thumbnail,
      }
    : null;

  // Tech more (next 2 tech articles)
  const techMore = techFiltered.slice(1, 3).map((a) => ({
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

  // Merge standings with static data
  let mergedDrivers = [...DRIVERS];
  if (driverStandings.length > 0) {
    const map = new Map(driverStandings.map((s) => [s.driverId, s]));
    mergedDrivers = DRIVERS.map((d) => {
      const id = Object.entries(DRIVER_ID_MAP).find(([, name]) => name === d.name)?.[0];
      const s = id ? map.get(id) : undefined;
      return s ? { ...d, pos: s.position, points: s.points } : d;
    }).sort((a, b) => a.pos - b.pos);
  }

  let mergedConstructors = [...CONSTRUCTORS];
  if (constructorStandings.length > 0) {
    const map = new Map(constructorStandings.map((s) => [s.driverId, s]));
    mergedConstructors = CONSTRUCTORS.map((c) => {
      const id = Object.entries(CONSTRUCTOR_ID_MAP).find(([, tid]) => tid === c.teamId)?.[0];
      const s = id ? map.get(id) : undefined;
      return s ? { ...c, pos: s.position, points: s.points } : c;
    }).sort((a, b) => a.pos - b.pos);
  }

  return (
    <HomeClient
      headline={headline}
      briefing={briefing}
      gpData={gpData}
      raceSchedule={raceSchedule}
      techFeatured={techFeatured}
      techMore={techMore}
      snsClips={snsClips}
      drivers={mergedDrivers.slice(0, 5)}
      constructors={mergedConstructors.slice(0, 5)}
      teamColors={TEAM_COLORS}
    />
  );
}
