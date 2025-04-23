install:
	# copy main.js and manifest.json to the obsidian plugins folder
	# ~/SynologyDrive/AppDataSync/obsidian/.obsidian/plugins/obsidian-yuque-publish
	npm run dev
	cp main.js ~/SynologyDrive/AppDataSync/obsidian/.obsidian/plugins/obsidian-yuque-publish
	cp manifest.json ~/SynologyDrive/AppDataSync/obsidian/.obsidian/plugins/obsidian-yuque-publish
	cp styles.css ~/SynologyDrive/AppDataSync/obsidian/.obsidian/plugins/obsidian-yuque-publish






