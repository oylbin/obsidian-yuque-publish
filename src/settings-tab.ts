import { App, PluginSettingTab, Setting } from 'obsidian';
import YuquePublishPlugin from './main';
import { YuquePublishSettings } from './settings';

export class YuquePublishSettingTab extends PluginSettingTab {
    plugin: YuquePublishPlugin;

    constructor(app: App, plugin: YuquePublishPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Yuque Publish Settings' });

        // Add new group button
        new Setting(containerEl)
            .setName('Add New Group')
            .setDesc('Add a new Yuque group configuration')
            .addButton(button => {
                button
                    .setButtonText('Add Group')
                    .onClick(async () => {
                        this.plugin.settings.groups.push({
                            urlPrefix: '',
                            authToken: ''
                        });
                        await this.plugin.saveSettings();
                        this.display();
                    });
            });

        // Display existing groups
        this.plugin.settings.groups.forEach((group, index) => {
            const groupDiv = containerEl.createDiv('yuque-group-setting');
            groupDiv.createEl('h3', { text: `Group ${index + 1}` });

            // URL Prefix setting
            new Setting(groupDiv)
                .setName('URL Prefix')
                .setDesc('The prefix of Yuque group URL (e.g., https://topjoy.yuque.com/tsd)')
                .addText(text => text
                    .setPlaceholder('Enter URL prefix')
                    .setValue(group.urlPrefix)
                    .onChange(async (value) => {
                        this.plugin.settings.groups[index].urlPrefix = value;
                        await this.plugin.saveSettings();
                    }));

            // Auth Token setting
            new Setting(groupDiv)
                .setName('Auth Token')
                .setDesc('The authentication token for this group')
                .addText(text => text
                    .setPlaceholder('Enter auth token')
                    .setValue(group.authToken)
                    .onChange(async (value) => {
                        this.plugin.settings.groups[index].authToken = value;
                        await this.plugin.saveSettings();
                    }));

            // Delete button
            new Setting(groupDiv)
                .addButton(button => {
                    button
                        .setButtonText('Delete')
                        .setWarning()
                        .onClick(async () => {
                            this.plugin.settings.groups.splice(index, 1);
                            await this.plugin.saveSettings();
                            this.display();
                        });
                });
        });
    }
} 