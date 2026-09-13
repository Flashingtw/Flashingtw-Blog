interface ArchiveExcerptSource {
  body?: string;
  data: { description?: string; encrypted?: boolean };
}

/** 只輸出短篇純文字預覽，跳過程式碼、圖片與編輯註解。 */
export function archiveExcerpt(post: ArchiveExcerptSource, encryptedText: string): string {
  if (post.data.encrypted) return encryptedText;
  const source = post.data.description?.trim() || post.body || "";
  const plain = source
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/^\s*(?:#{1,6}\s+|>\s*|[-+*]\s+|\d+\.\s+)/gm, "")
    .replace(/^\s*[-*_]{3,}\s*$/gm, " ")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const characters = Array.from(plain);
  return characters.length > 150 ? `${characters.slice(0, 150).join("")}…` : plain;
}
