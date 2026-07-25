// Centralized local dynamic image loader for Frames to Forever studio
// Automatically discovers all local images in public/images/<category>/ using Vite import.meta.glob.

export type Category = string;

const CATEGORY_NAME_OVERRIDES: Record<string, string> = {
  "wedding": "Wedding",
  "pre-wedding": "Pre Wedding",
  "engagement": "Engagement",
  "haldi": "Haldi",
  "mehendi": "Mehendi",
  "mehndi": "Mehendi",
  "reception": "Reception",
  "portrait": "Portrait",
  "maternity": "Maternity",
  "baby": "Baby",
  "baby-shoot": "Baby Shoot",
  "birthday": "Birthday",
  "fashion": "Fashion",
  "commercial": "Commercial",
  "products": "Products",
  "events": "Events",
  "travel": "Travel",
  "about": "About",
};

export function slugToCategoryName(slug: string): string {
  const normalized = slug.toLowerCase().trim();
  if (CATEGORY_NAME_OVERRIDES[normalized]) {
    return CATEGORY_NAME_OVERRIDES[normalized];
  }
  return normalized
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function categorySlug(c: string): string {
  return c.toLowerCase().trim().replace(/\s+/g, "-");
}

export interface Photo {
  id: string;
  src: string;
  full: string;
  w: number;
  h: number;
  category: string;
  alt: string;
}

interface LocalImageRecord {
  folderSlug: string;
  filename: string;
  src: string;
}

// Vite glob import to dynamically collect every image file inside public/images/
const imageModules = import.meta.glob(
  "/public/images/**/*.{webp,jpg,jpeg,png,avif,WEBP,JPG,JPEG,PNG,AVIF}",
  { eager: true, query: "?url", import: "default" }
);

const DISCOVERED_RECORDS: LocalImageRecord[] = [];

for (const pathKey in imageModules) {
  const mod = imageModules[pathKey];
  const url = typeof mod === "string" ? mod : (mod as { default?: string })?.default || String(mod);

  // Normalize path string: e.g. "/public/images/wedding/01.jpg" -> "wedding/01.jpg"
  const cleanPath = pathKey
    .replace(/\\/g, "/")
    .replace(/^(\/?public)?\/?images\//, "");

  const parts = cleanPath.split("/");
  if (parts.length >= 2) {
    const folderSlug = parts[0].toLowerCase().trim();
    const filename = parts.slice(1).join("/");
    // Format src URL to be served relative to root (public folder)
    let srcUrl = url;
    if (!srcUrl.startsWith("/") && !srcUrl.startsWith("http")) {
      srcUrl = `/${srcUrl}`;
    }
    srcUrl = srcUrl.replace(/^\/public\//, "/");

    DISCOVERED_RECORDS.push({
      folderSlug,
      filename,
      src: srcUrl,
    });
  }
}

const DEFAULT_CATEGORIES: string[] = [
  "Wedding", "Pre Wedding", "Engagement", "Haldi", "Mehendi", "Reception",
  "Portrait", "Maternity", "Baby", "Birthday", "Fashion", "Commercial",
  "Products", "Events", "Travel",
];

// Automatically extract discovered categories from public/images/ (excluding 'about' which is for studio section)
const discoveredFolderSlugs = Array.from(
  new Set(DISCOVERED_RECORDS.map((r) => r.folderSlug))
).filter((slug) => slug !== "about");

const discoveredCategoryNames = discoveredFolderSlugs.map(slugToCategoryName);

// Exported CATEGORIES list: discovered folders merged with defaults, preserving unique order
export const CATEGORIES: string[] = Array.from(
  new Set([...discoveredCategoryNames, ...DEFAULT_CATEGORIES])
);

export function categoryFromSlug(slug: string): string | null {
  const target = slug.toLowerCase().trim();
  const foundInCategories = CATEGORIES.find((c) => categorySlug(c) === target);
  if (foundInCategories) return foundInCategories;

  if (DISCOVERED_RECORDS.some((r) => r.folderSlug === target)) {
    return slugToCategoryName(target);
  }

  return null;
}

const RATIOS = [
  { w: 800, h: 1000 },
  { w: 900, h: 700 },
  { w: 800, h: 1100 },
  { w: 1000, h: 750 },
  { w: 800, h: 900 },
];

export function photosFor(category: string, count?: number): Photo[] {
  const targetSlug = categorySlug(category);

  // Match records by folder slug or category name slug
  const matchingRecords = DISCOVERED_RECORDS.filter(
    (r) => r.folderSlug === targetSlug || categorySlug(slugToCategoryName(r.folderSlug)) === targetSlug
  );

  // Natural alphanumeric sorting (01.jpg, 02.jpg, 10.jpg)
  matchingRecords.sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" })
  );

  const displayCategory = slugToCategoryName(targetSlug);

  const photos: Photo[] = matchingRecords.map((rec, i) => {
    const ratio = RATIOS[i % RATIOS.length];
    const cleanFileName = rec.filename.replace(/\.[^/.]+$/, "");
    return {
      id: `${targetSlug}-${cleanFileName}-${i}`,
      src: rec.src,
      full: rec.src,
      w: ratio.w,
      h: ratio.h,
      category: displayCategory,
      alt: `${displayCategory} photography — frame ${i + 1}`,
    };
  });

  if (typeof count === "number" && count > 0) {
    return photos.slice(0, count);
  }

  return photos;
}

export function allPhotos(perCategory?: number): Photo[] {
  return CATEGORIES.flatMap((c) => photosFor(c, perCategory));
}

// Fixed list and order of categories strictly for the homepage portfolio preview
export const HOME_CATEGORIES: string[] = [
  "Wedding",
  "Pre Wedding",
  "Haldi",
  "Mehendi",
  "Engagement",
  "Portrait",
  "Reception",
  "Events",
];

// Curated preview photos for the homepage: 1st available frame from each HOME_CATEGORIES category
export function previewPhotos(count = 8): Photo[] {
  const previewList: Photo[] = [];
  for (const cat of HOME_CATEGORIES) {
    const catPhotos = photosFor(cat, 1);
    if (catPhotos.length > 0) {
      previewList.push(catPhotos[0]);
    }
    if (previewList.length >= count) break;
  }
  return previewList;
}
