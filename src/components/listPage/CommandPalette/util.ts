const createItemRegex = /^([^#\s]+(?:[^#\n\t\r])*)((?:#[^#\s][^#\n\t\r]*)*)/gm;
const searchItemRegex = /^([^#\s]+(?:[^#\n\t\r])*)((?:#[^#\s][^#\n\t\r]*)*)/gm;

function parseCreateInput(input: string): [name: string, tags: string[]] | undefined {
  const tokens = [...input.matchAll(createItemRegex)][0];
  if (!tokens) return undefined;

  let [name, tagStrs] = tokens.slice(1);
  name = name.trim();
  let tags = tagStrs
    .split("#")
    .map((tag) => tag.trim())
    .filter((t) => t.length > 0);

  tags = [...new Set(tags)];

  return [name, tags];
}

function parseSearchInput(input: string): [name: string, tags: string[]] | undefined {
  const tokens = [...input.matchAll(createItemRegex)][0];
  if (!tokens) return undefined;

  let [name, tagStrs] = tokens.slice(1);
  name = name.trim();
  let tags = tagStrs
    .split("#")
    .map((tag) => tag.trim())
    .filter((t) => t.length > 0);

  tags = [...new Set(tags)];

  return [name, tags];
}