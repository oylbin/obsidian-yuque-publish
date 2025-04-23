import { App, Plugin, PluginManifest, Notice } from 'obsidian';

export default class YuquePublishPlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    console.log('Loading Yuque Publish plugin');
    
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

  onunload() {
    console.log('Unloading Yuque Publish plugin');
    
    // Add your cleanup code here
  }
} 