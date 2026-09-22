import esbuild from 'esbuild';
import { randomUUID } from 'node:crypto';
import { rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outfile = join(tmpdir(), `obsidian-yuque-publish-${randomUUID()}.cjs`);

try {
    await esbuild.build({
        entryPoints: ['tests/frontmatter.test.ts'],
        bundle: true,
        platform: 'node',
        format: 'cjs',
        target: 'node18',
        outfile,
        logLevel: 'warning',
    });

    await import(pathToFileURL(outfile).href);
} finally {
    await rm(outfile, { force: true });
}
