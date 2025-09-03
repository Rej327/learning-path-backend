export function sanitizeFilename(input: string, fallback = "video"): string {
    const cleaned = input.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
    return cleaned.length ? cleaned : fallback;
}
