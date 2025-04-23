import { App, Plugin, PluginManifest } from 'obsidian';

export default class YuquePublishPlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    console.log('Loading Yuque Publish plugin');
    
    // Add your plugin initialization code here
  }

  onunload() {
    console.log('Unloading Yuque Publish plugin');
    
    // Add your cleanup code here
  }
} 