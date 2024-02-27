import { IMAGES_STORAGE_BUCKET_ORIGIN } from "../../constants";

export function getProductImageUrl(imgId: string): string {
  return `${IMAGES_STORAGE_BUCKET_ORIGIN}/${imgId}`;
}
