import { Notice } from 'obsidian';
import { requestUrl } from 'obsidian';

interface YuqueConfig {
    urlPrefix: string;
    authToken: string;
}

interface YuqueUserResponse {
    data: {
        login: string;
    };
}

export class YuqueValidator {
    static async validate(config: YuqueConfig): Promise<void> {
        // Validate URL format
        const urlRegex = /^https:\/\/([^\/]+)\.yuque\.com\/([^\/]+)(\/)?$/;
        const match = config.urlPrefix.match(urlRegex);
        
        if (!match) {
            throw new Error('URL format is incorrect. It should be like https://SpaceName.yuque.com/GroupName/');
        }

        const [, spaceName, groupName] = match;
        const baseUrl = `https://${spaceName}.yuque.com`;
        const apiUrl = `${baseUrl}/api/v2/user`;

        try {
            const response = await requestUrl({
                url: apiUrl,
                method: 'GET',
                headers: {
                    'X-Auth-Token': config.authToken
                }
            });

            if (response.status !== 200) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = response.json as YuqueUserResponse;
            const loginName = data.data.login;

            if (loginName !== groupName) {
                throw new Error(`Token is valid but the team name "${loginName}" does not match the configured name "${groupName}"`);
            }

            new Notice('Configuration is valid!');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Configuration validation failed: ${error.message}`);
            }
            throw new Error('Configuration validation failed: Unknown error');
        }
    }
} 