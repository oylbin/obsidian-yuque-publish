import { App, PluginSettingTab, Setting, Notice } from 'obsidian';
import YuquePublishPlugin from './main';
import { YuquePublishSettings } from './settings';
import { YuqueValidator } from './yuque-validator';

export class YuquePublishSettingTab extends PluginSettingTab {
    plugin: YuquePublishPlugin;

    constructor(app: App, plugin: YuquePublishPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setHeading()
            .setName('Yuque group and token explanation');

        // Add explanation section
        const explanationDiv = containerEl.createDiv('yuque-explanation');
        const ol = explanationDiv.createEl('ol');
        
        const li1 = ol.createEl('li');
        li1.createEl('strong', { text: 'If you are using a personal account:' });
        li1.createEl('p', { text: 'Your URL prefix: https://www.yuque.com/yourUserName/' });
        li1.createEl('p', { text: 'You can find your access token in: https://www.yuque.com/settings/tokens' });
        
        const li2 = ol.createEl('li');
        li2.createEl('strong', { text: 'If you are using a team account:' });
        li2.createEl('p', { text: 'Your URL prefix: https://spaceName.yuque.com/groupName/' });
        li2.createEl('p', { text: 'You can find your access token in: https://spaceName.yuque.com/groupName/settings/tokens' });

        // Add new group button
        new Setting(containerEl)
            .setName('Add group')
            .setDesc('Add a new Yuque group configuration')
            .addButton(button => {
                button
                    .setButtonText('Add group')
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
                .setName('URL prefix')
                .setDesc('The URL prefix of your Yuque group (e.g., https://spaceName.yuque.com/groupName/)')
                .addText(text => text
                    .setPlaceholder('Enter URL prefix')
                    .setValue(group.urlPrefix)
                    .onChange(async (value) => {
                        this.plugin.settings.groups[index].urlPrefix = value;
                        await this.plugin.saveSettings();
                    }));

            // Auth Token setting
            new Setting(groupDiv)
                .setName('Access token')
                .setDesc('The access token for this group')
                .addText(text => text
                    .setPlaceholder('Enter access token')
                    .setValue(group.authToken)
                    .onChange(async (value) => {
                        this.plugin.settings.groups[index].authToken = value;
                        await this.plugin.saveSettings();
                    }));

            // Test and Delete buttons
            new Setting(groupDiv)
                .addButton(button => {
                    button
                        .setButtonText('Test')
                        .onClick(async () => {
                            try {
                                await YuqueValidator.validate({
                                    urlPrefix: group.urlPrefix,
                                    authToken: group.authToken
                                });
                            } catch (error) {
                                if (error instanceof Error) {
                                    new Notice(error.message);
                                } else {
                                    new Notice('Configuration validation failed: Unknown error');
                                }
                            }
                        });
                })
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