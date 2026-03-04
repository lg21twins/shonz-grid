import { NextRequest, NextResponse } from "next/server";
import { upsertStanding, type StandingsEntry } from "@/lib/notion";

const SEASON = "2026";
const DRIVER_URL = `https://api.jolpi.ca/ergast/f1/${SEASON}/driverstandings.json`;
const CONSTRUCTOR_URL = `https://api.jolpi.ca/ergast/f1/${SEASON}/constructorstandings.json`;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [driverRes, constructorRes] = await Promise.all([
      fetch(DRIVER_URL),
      fetch(CONSTRUCTOR_URL),
    ]);

    let driverCount = 0;
    let constructorCount = 0;
    let round = 0;
    const unmatchedIds: string[] = [];

    // Driver standings
    if (driverRes.ok) {
      const data = await driverRes.json();
      const list = data?.MRData?.StandingsTable?.StandingsLists?.[0];

      if (list?.DriverStandings) {
        round = parseInt(list.round ?? "0", 10);

        for (const ds of list.DriverStandings) {
          const entry: StandingsEntry = {
            driverId: ds.Driver.driverId,
            type: "driver",
            position: parseInt(ds.position, 10),
            points: parseFloat(ds.points),
            wins: parseInt(ds.wins, 10),
            season: SEASON,
            round,
          };

          await upsertStanding(entry);
          driverCount++;
          await new Promise((r) => setTimeout(r, 350));
        }
      }
    }

    // Constructor standings
    if (constructorRes.ok) {
      const data = await constructorRes.json();
      const list = data?.MRData?.StandingsTable?.StandingsLists?.[0];

      if (list?.ConstructorStandings) {
        if (!round) round = parseInt(list.round ?? "0", 10);

        for (const cs of list.ConstructorStandings) {
          const entry: StandingsEntry = {
            driverId: cs.Constructor.constructorId,
            type: "constructor",
            position: parseInt(cs.position, 10),
            points: parseFloat(cs.points),
            wins: parseInt(cs.wins, 10),
            season: SEASON,
            round,
          };

          await upsertStanding(entry);
          constructorCount++;
          await new Promise((r) => setTimeout(r, 350));
        }
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        season: SEASON,
        round,
        driversUpdated: driverCount,
        constructorsUpdated: constructorCount,
        ...(unmatchedIds.length > 0 && { unmatchedIds }),
      },
    });
  } catch (err) {
    console.error("Cron update-standings failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
