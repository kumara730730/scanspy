export function formatSize(bytes) {
  const kb = bytes / 1024;
  if (Number.isNaN(kb) || !Number.isFinite(kb)) return "0 KB";
  return `${kb.toFixed(2)} KB`;
}
