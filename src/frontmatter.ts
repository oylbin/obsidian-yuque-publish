export interface FrontMatterBoundary {
    exists: boolean;
    contentStart: number;
}

/**
 * Remove only the front matter range identified by Obsidian.
 * Markdown horizontal rules in the document body are preserved verbatim.
 */
export function stripFrontMatter(content: string, boundary: FrontMatterBoundary): string {
    if (!boundary.exists) {
        if (/^---(?:\r?\n|$)/.test(content)) {
            throw new Error('Front matter is not closed with a --- delimiter');
        }

        throw new Error('No front matter found in the document');
    }

    return content.slice(boundary.contentStart);
}
