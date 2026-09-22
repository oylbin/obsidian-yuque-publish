import { stripFrontMatter } from '../src/frontmatter';

let passed = 0;

function test(name: string, run: () => void): void {
    try {
        run();
        passed += 1;
        console.log(`ok - ${name}`);
    } catch (error) {
        console.error(`not ok - ${name}`);
        throw error;
    }
}

function assertEqual(actual: string, expected: string): void {
    if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
    }
}

function assertThrows(run: () => void, expectedMessage: string): void {
    try {
        run();
    } catch (error) {
        if (error instanceof Error && error.message === expectedMessage) {
            return;
        }

        throw error;
    }

    throw new Error(`Expected error: ${expectedMessage}`);
}

function stripKnownFrontMatter(content: string, body: string): string {
    return stripFrontMatter(content, {
        exists: true,
        contentStart: content.length - body.length,
    });
}

test('preserves multiple horizontal rules in an LF body', () => {
    const body = '# Heading\n\n---\n\nFirst section\n\n---\n\nSecond section\n';
    const content = `---\ntitle: Example\n---\n${body}`;

    assertEqual(stripKnownFrontMatter(content, body), body);
});

test('preserves CRLF line endings and body delimiters', () => {
    const body = '# Heading\r\n\r\n---\r\n\r\nBody\r\n';
    const content = `---\r\ntitle: Example\r\n---\r\n${body}`;

    assertEqual(stripKnownFrontMatter(content, body), body);
});

test('preserves a horizontal rule immediately after front matter', () => {
    const body = '---\n\n# Heading\n';
    const content = `---\ntitle: Example\n---\n${body}`;

    assertEqual(stripKnownFrontMatter(content, body), body);
});

test('preserves delimiters inside fenced code blocks', () => {
    const body = '# Heading\n\n```markdown\n---\nkey: value\n---\n```\n';
    const content = `---\ntitle: Example\n---\n${body}`;

    assertEqual(stripKnownFrontMatter(content, body), body);
});

test('rejects a document without front matter', () => {
    assertThrows(
        () => stripFrontMatter('# Heading\n\n---\n', { exists: false, contentStart: 0 }),
        'No front matter found in the document',
    );
});

test('rejects an unclosed front matter block', () => {
    assertThrows(
        () => stripFrontMatter('---\ntitle: Example\n# Heading\n', { exists: false, contentStart: 0 }),
        'Front matter is not closed with a --- delimiter',
    );
});

console.log(`Passed ${passed} front matter tests`);
