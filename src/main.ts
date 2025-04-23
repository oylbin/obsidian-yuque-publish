import { App, Plugin, PluginManifest, Notice } from 'obsidian';
import { YuquePublishSettings, DEFAULT_SETTINGS } from './settings';
import { YuquePublishSettingTab } from './settings-tab';

export default class YuquePublishPlugin extends Plugin {
    settings: YuquePublishSettings;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        console.log('Loading Yuque Publish plugin');
        
        // Load settings
        await this.loadSettings();

        // Add settings tab
        this.addSettingTab(new YuquePublishSettingTab(this.app, this));

        // Add command to publish to Yuque
        this.addCommand({
            id: 'publish-to-yuque',
            name: 'Publish to Yuque',
            callback: () => {
                console.log('Publishing to Yuque');
                new Notice('hello');
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload() {
        console.log('Unloading Yuque Publish plugin');
    }
} 