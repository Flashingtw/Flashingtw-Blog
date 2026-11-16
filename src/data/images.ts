/** 集中管理經 Astro 處理的圖片，以及封面的預設來源。 */
import { sample } from "es-toolkit";
import type { Post } from "@/toolkit/posts/types";
import type { ImageMetadata } from "astro";
import fallbackImage from "../assets/avatar.avif";

export const avatar = "/assets/avatar.png";

export const coverMatches = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/cover/*.avif",
  {
    eager: true,
  },
);

export const coverPresets: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(coverMatches).map(([path, mod]) => {
    const fileName = path.split("/").pop()?.split(".")[0] || "";
    return [fileName, mod.default];
  }),
);

export const covers: ImageMetadata[] = Object.values(coverMatches).map((mod) => mod.default);

export const wallpaperMatches = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/wallpapers/*.avif",
  {
    eager: true,
  },
);

export const wallpapers: ImageMetadata[] = Object.values(wallpaperMatches).map(
  (mod) => mod.default,
);

export function resolveFixedCover(fixedCover?: string): ImageMetadata | string {
  if (!fixedCover) return fallbackImage;
  return coverPresets[fixedCover] ?? (fixedCover.startsWith("http") ? fixedCover : fallbackImage);
}

export function getPostCover(
  post: Partial<Post>,
  Covers?: Array<ImageMetadata | string>,
): ImageMetadata | string {
  if (post?.data?.cover) {
    return post.data.cover;
  }

  const defaultCovers = Covers?.length ? Covers : covers;
  return sample(defaultCovers) ?? fallbackImage;
}

export function getRandomWallpaper(): ImageMetadata {
  return sample(wallpapers) ?? fallbackImage;
}
