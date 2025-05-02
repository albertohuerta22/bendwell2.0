// Converts a stretch name like "Neck Stretch (L)" into a safe filename like "neck-stretch-l.json"
export function getJsonFilenameFromLabel(label: string): string {
  return (
    label
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[()]/g, '') + // Remove parentheses
    '.json'
  ); // Append file extension
}
