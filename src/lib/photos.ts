// Demo photograph generator: uses picsum.photos with deterministic seeds so
// the same seed always returns the same beautifully composed placeholder image.

export type Category =
  | "Wedding" | "Pre Wedding" | "Engagement" | "Haldi" | "Mehendi"
  | "Reception" | "Portrait" | "Maternity" | "Baby" | "Birthday"
  | "Fashion" | "Commercial" | "Products" | "Events" | "Travel";

export const CATEGORIES: Category[] = [
  "Wedding","Pre Wedding","Engagement","Haldi","Mehendi","Reception",
  "Portrait","Maternity","Baby","Birthday","Fashion","Commercial",
  "Products","Events","Travel",
];

export function categorySlug(c: Category): string {
  return c.toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): Category | null {
  return CATEGORIES.find((c) => categorySlug(c) === slug) ?? null;
}

const POOL = [
  1005,1011,1012,1013,1014,1015,1016,1019,1020,1021,1022,1023,1024,1025,1026,
  1027,1028,1029,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1050,
  1051,1052,1053,1054,1056,1057,1059,1060,1062,1063,1064,1065,1066,1067,1068,
  1069,1070,1071,1072,1073,1074,1076,1077,1078,1079,1080,1081,1082,1083,1084,
];

const RATIOS = [
  { w: 800, h: 1000 },
  { w: 900, h: 700 },
  { w: 800, h: 1100 },
  { w: 1000, h: 750 },
  { w: 800, h: 900 },
];

export interface Photo {
  id: string;
  src: string;
  full: string;
  w: number;
  h: number;
  category: Category;
  alt: string;
}

export function photosFor(category: Category, count = 15): Photo[] {
  const catIdx = CATEGORIES.indexOf(category);
  return Array.from({ length: count }, (_, i) => {
    const poolId = POOL[(catIdx * 7 + i * 3) % POOL.length];
    const ratio = RATIOS[(catIdx + i) % RATIOS.length];
    return {
      id: `${category}-${i}`,
      src: `https://picsum.photos/id/${poolId}/${ratio.w}/${ratio.h}`,
      full: `https://picsum.photos/id/${poolId}/1600/${Math.round(1600 * ratio.h / ratio.w)}`,
      w: ratio.w,
      h: ratio.h,
      category,
      alt: `${category} photography — frame ${i + 1}`,
    };
  });
}

export function allPhotos(perCategory = 15): Photo[] {
  return CATEGORIES.flatMap((c) => photosFor(c, perCategory));
}

// A curated mix for the homepage preview — one hero frame per category, first 8.
export function previewPhotos(count = 8): Photo[] {
  return CATEGORIES.slice(0, count).map((c) => photosFor(c, 1)[0]);
}
