import { getStandings } from "@/lib/notion";
import {
  DRIVERS,
  CONSTRUCTORS,
  RACES,
  CIRCUITS,
  TEAM_COLORS,
  DRIVER_ID_MAP,
  CONSTRUCTOR_ID_MAP,
  getNextRace,
  getNextCircuit,
} from "@/data/f1-2026";
import { DataPageClient } from "./DataPageClient";

export const revalidate = 300;

export default async function DataPage() {
  const [driverStandings, constructorStandings] = await Promise.all([
    getStandings("driver"),
    getStandings("constructor"),
  ]);

  const standingsRound =
    driverStandings.length > 0 ? driverStandings[0].round : null;

  // Merge driver standings with static data
  let mergedDrivers = [...DRIVERS];
  if (driverStandings.length > 0) {
    const standingsMap = new Map(
      driverStandings.map((s) => [s.driverId, s]),
    );

    mergedDrivers = DRIVERS.map((driver) => {
      const driverId = Object.entries(DRIVER_ID_MAP).find(
        ([, korName]) => korName === driver.name,
      )?.[0];
      if (!driverId) return driver;

      const standing = standingsMap.get(driverId);
      if (!standing) return driver;

      return { ...driver, pos: standing.position, points: standing.points };
    }).sort((a, b) => a.pos - b.pos);
  }

  // Merge constructor standings with static data
  let mergedConstructors = [...CONSTRUCTORS];
  if (constructorStandings.length > 0) {
    const standingsMap = new Map(
      constructorStandings.map((s) => [s.driverId, s]),
    );

    mergedConstructors = CONSTRUCTORS.map((constructor) => {
      const constructorId = Object.entries(CONSTRUCTOR_ID_MAP).find(
        ([, teamId]) => teamId === constructor.teamId,
      )?.[0];
      if (!constructorId) return constructor;

      const standing = standingsMap.get(constructorId);
      if (!standing) return constructor;

      return {
        ...constructor,
        pos: standing.position,
        points: standing.points,
      };
    }).sort((a, b) => a.pos - b.pos);
  }

  const nextRace = getNextRace();
  const nextCircuit = getNextCircuit();

  return (
    <DataPageClient
      drivers={mergedDrivers}
      constructors={mergedConstructors}
      races={RACES}
      circuits={CIRCUITS}
      teamColors={TEAM_COLORS}
      nextRaceRound={nextRace.round}
      nextCircuitRound={nextCircuit.round}
      standingsRound={standingsRound}
    />
  );
}
