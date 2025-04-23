import { App, Plugin, PluginManifest, Notice, TFile, requestUrl } from 'obsidian';
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
            callback: async () => {
                const activeFile = this.app.workspace.getActiveFile();
                if (!activeFile) {
                    new Notice('No active file found');
                    return;
                }

                try {
                    await this.publishToYuque(activeFile);
                } catch (error) {
                    new Notice(`Failed to publish: ${error.message}`);
                }
            }
        });
    }

    async publishToYuque(file: TFile) {
        // Read file content
        const content = await this.app.vault.read(file);
        
        // Parse front matter
        const frontMatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
        if (!frontMatter) {
            throw new Error('No front matter found in the document');
        }

        // Get yuque-doc-url from front matter
        const yuqueDocUrl = frontMatter['yuque-doc-url'];
        if (!yuqueDocUrl) {
            throw new Error('yuque-doc-url is required in front matter');
        }

        // Get title from front matter or use filename
        const title = frontMatter['title'] || file.basename;

        // Parse yuque-doc-url to get domain, group_login, book_slug, and doc_slug
        const urlParts = yuqueDocUrl.split('/');
        if (urlParts.length !== 6) {
            throw new Error('Invalid yuque-doc-url format');
        }

        const domain = urlParts[2];
        const groupLogin = urlParts[3];
        const bookSlug = urlParts[4];
        const docSlug = urlParts[5];

        // Find matching group config
        const groupConfig = this.settings.groups.find(group => 
            yuqueDocUrl.startsWith(group.urlPrefix)
        );

        if (!groupConfig) {
            throw new Error(`No auth token configured for ${yuqueDocUrl}`);
        }

        // Prepare API headers
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': groupConfig.authToken
        };

        // Check if document exists
        const checkUrl = `https://${domain}/api/v2/repos/${groupLogin}/${bookSlug}/docs/${docSlug}`;
        let checkResponse;
        try {
            checkResponse = await requestUrl({
                url: checkUrl,
                headers: headers
            });
        } catch (error) {
            // If 404, document doesn't exist
            if (error.status === 404) {
                checkResponse = { status: 404 };
            } else {
                throw error;
            }
        }
        
        // Get content without front matter
        const contentWithoutFrontMatter = content.split('---')[2] || content;

        // Prepare document payload
        const payload = {
            slug: docSlug,
            title: title,
            public: 2,
            format: 'markdown',
            body: contentWithoutFrontMatter
        };

        let response;
        if (checkResponse.status === 200) {
            // Update existing document
            response = await requestUrl({
                url: checkUrl,
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(payload)
            });
        } else {
            // Create new document
            const createUrl = `https://${domain}/api/v2/repos/${groupLogin}/${bookSlug}/docs`;
            response = await requestUrl({
                url: createUrl,
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
        }

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Failed to publish document: ${response.status}`);
        }

        // Open the document in default browser
        window.open(yuqueDocUrl, '_blank');
        new Notice('Document published successfully!');
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