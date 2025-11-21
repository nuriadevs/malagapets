export function capitalizeText(text?: string): string {
    if (!text || typeof text !== "string") return "Not Available";
    return text.toLowerCase().replace(/(?:^|\s)\w/g, (l) => l.toUpperCase());
}

export function getGoogleStreetViewUrl(
    lat?: number,
    lon?: number
): string | null {
    if (
        typeof lat !== "number" ||
        typeof lon !== "number" ||
        isNaN(lat) ||
        isNaN(lon)
    ) {
        return null;
    }
    return `https://www.google.com/maps?q&layer=c&cbll=${lat},${lon}`;
}
