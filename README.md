# Yuque Publish

A plugin that allows you to publish your notes directly to [Yuque](https://www.yuque.com/), a popular Chinese knowledge management platform.

## Features

- Publish Obsidian notes to Yuque with a single command
- Support for both personal and team Yuque accounts
- Automatic document creation or updating
- Configurable document visibility settings
- Multiple group configurations support

## Installation

1. Open Obsidian
2. Go to Settings → Community plugins
3. Search for "Yuque Publish"
4. Click Install
5. Enable the plugin

## Configuration

Before using the plugin, you need to configure your Yuque access tokens:

1. Open Obsidian Settings
2. Find "Yuque Publish" in the Community Plugins section
3. Click on the settings icon
4. Add your Yuque group configurations:

### For Personal Accounts:
- URL prefix: `https://www.yuque.com/yourUserName/`
- Access token: Get it from https://www.yuque.com/settings/tokens

### For Team Accounts:
- URL prefix: `https://spaceName.yuque.com/groupName/`
- Access token: Get it from https://spaceName.yuque.com/groupName/settings/tokens

## Usage

### Publishing a Document

1. Add the following front matter to your Obsidian note:
```yaml
---
yuque-doc-url: https://spaceName.yuque.com/groupName/bookSlug/docSlug
yuque-doc-title: Your Document Title
yuque-doc-public: 1
---
```

Where:
- `yuque-doc-url`: The target Yuque document URL
- `yuque-doc-title`: (Optional) The title of the document in Yuque. If not specified, the filename will be used
- `yuque-doc-public`: (Optional) Document visibility (0: private, 1: public, 2: public for space members)

2. Use the command palette (Ctrl/Cmd + P) and select "Publish to Yuque"
3. The plugin will automatically create or update the document on Yuque

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have suggestions, please open an issue on the GitHub repository. 