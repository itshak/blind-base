export function parsePgnFile(pgnText) {
  if (!pgnText) return [];
  // ensure windows line endings unified
  const text = pgnText.replace(/\r\n/g, "\n");
  // split games by two line breaks followed by [Event tag or end of string
  const rawGames = text
    .trim()
    .split(/\n\s*\n(?=\[Event|\[\w+)/g) // lookahead keeps tag in piece
    .filter(Boolean);

  return rawGames.map((raw) => {
    const headerMatches = [...raw.matchAll(/\[(\w+)\s+"([^"]*)"\]/g)];
    const headers = Object.fromEntries(headerMatches.map((m) => [m[1], m[2]]));
    // moves section starts after last closing bracket
    const moves = raw.substring(raw.lastIndexOf("]") + 1).trim();
    return {
      raw,
      headers,
      moves,
      white: headers.White || "?",
      black: headers.Black || "?",
      result: headers.Result || "*",
      eco: headers.ECO || "",
    };
  });
}

export function serializeGames(games) {
  return games.map((g) => g.raw).join("\n\n");
}
