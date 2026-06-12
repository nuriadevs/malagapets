import { NextResponse } from "next/server";
import { getParks, getParksGeoJSON } from "@/lib/parks";

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");

  try {
    if (format === "geojson") {
      return NextResponse.json(await getParksGeoJSON());
    }
    return NextResponse.json(await getParks());
  } catch (error) {
    console.error("Error fetching parks:", error);
    return NextResponse.json(
      format === "geojson" ? { type: "FeatureCollection", features: [] } : [],
    );
  }
}
