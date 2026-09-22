import { copyFile, mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const pluginDir = join(
    homedir(),
    'SynologyDrive',
    'AppDataSync',
    'testvault',
    '.obsidian',
    'plugins',
    'obsidian-yuque-publish',
);

await mkdir(pluginDir, { recursive: true });

for (const file of ['main.js', 'manifest.json', 'styles.css']) {
    await copyFile(file, join(pluginDir, file));
}

console.log(`Installed plugin to ${pluginDir}`);
