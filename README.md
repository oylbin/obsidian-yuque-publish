# Yuque Publish

一个可以将笔记直接发布到[语雀](https://www.yuque.com/)（一个流行的中文知识管理平台）的插件。

## 功能特点

- 一键将 Obsidian 笔记发布到语雀
- 支持个人账号和团队账号
- 自动创建或更新文档
- 可配置文档可见性设置
- 支持多组配置

## 安装方法

1. 打开 Obsidian
2. 进入设置 → 社区插件
3. 搜索 "Yuque Publish"
4. 点击安装
5. 启用插件

## 配置说明

使用插件前，需要配置语雀访问令牌：

1. 打开 Obsidian 设置
2. 在社区插件部分找到 "Yuque Publish"
3. 点击设置图标
4. 添加语雀群组配置：

### 个人账号：
- URL 前缀：`https://www.yuque.com/yourUserName/`
- 访问令牌：从 https://www.yuque.com/settings/tokens 获取

### 团队账号：
- URL 前缀：`https://spaceName.yuque.com/groupName/`
- 访问令牌：从 https://spaceName.yuque.com/groupName/settings/tokens 获取

## 使用方法

### 发布文档

1. 在 Obsidian 笔记中添加以下[前置元数据](https://publish.obsidian.md/help-zh/%E7%BC%96%E8%BE%91%E4%B8%8E%E6%A0%BC%E5%BC%8F%E5%8C%96/%E5%B1%9E%E6%80%A7#%E5%B1%9E%E6%80%A7%E6%A0%BC%E5%BC%8F)：
```yaml
---
yuque-doc-url: https://spaceName.yuque.com/groupName/bookSlug/docSlug
yuque-doc-title: 文档标题
yuque-doc-public: 1
---
```

其中：
- `yuque-doc-url`：目标语雀文档的 URL
- `yuque-doc-title`：（可选）语雀中的文档标题。如果未指定，将使用文件名
- `yuque-doc-public`：（可选）文档可见性（0：私密，1：公开，2：空间成员可见）

2. 使用命令面板（Ctrl/Cmd + P）并选择 "Publish to Yuque"
3. 插件将自动在语雀上创建或更新文档

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 支持

如果遇到任何问题或有建议，请在 GitHub 仓库中提交 issue。

---

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

1. Add the following [front matter](https://help.obsidian.md/properties#Property+format) to your Obsidian note:
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