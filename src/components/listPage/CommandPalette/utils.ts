const createItemRegex = /^([^#\s]+(?:[^#\n\t\r])*)((?:#[^#\s][^#\n\t\r]*)*)/gm;
const searchItemRegex = /^([^#\s]+(?:[^#\n\t\r])*){0,1}((?:#[^#\s][^#\n\t\r]*)*)/gm;

export function parseCreateInput(input: string): [name: string, tags: string[]] | undefined {
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

export function parseSearchInput(input: string): [name: string, tags: string[]] | undefined {
    const tokens = [...input.matchAll(searchItemRegex)][0];
    if (!tokens) return undefined;

    let [name, tagStrs] = tokens.slice(1);
    if (!name && !tagStrs) {
        return undefined;
    }

    name = name ? name.trim() : "";
    let tags = tagStrs
        .split("#")
        .map((tag) => tag.trim())
        .filter((t) => t.length > 0);

    tags = [...new Set(tags)];

    return [name, tags];
}
