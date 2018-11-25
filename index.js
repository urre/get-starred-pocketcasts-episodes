const puppeteer = require('puppeteer')
const YAML = require('json2yaml')
const empty = require('empty-folder')

const fs = require('fs')
const slugify = require('slugify')
let yamlText = ''

require('dotenv').config()

const urlLogin = 'https://playbeta.pocketcasts.com/web/settings/account'
const urlStarred = 'https://playbeta.pocketcasts.com/web/starred'
const saveMarkdownFiles = process.env.SAVE_MARKDOWN_FILES
const saveMarkdownFilesFolder = process.env.SAVE_MARKDOWN_FILES_FOLDER

let getEpisodes = async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })

	const navigationPromise = page.waitForNavigation()

	await page.goto(urlLogin, {
		timeout: 3000000,
		waitUntil: 'networkidle2'
	})

	await page.waitForSelector('.login-form > .email > input')
	await page.type('.login-form > .email > input', process.env.POCKETCAST_USER)
	await page.type(
		'.login-form > .password > input',
		process.env.POCKETCAST_PASSWORD
	)

	await page.click('.login-form > .big-button')
	await page.waitFor(3000);

	await page.goto(urlStarred)
	await page.waitForSelector('.episode-table-cell')

	await navigationPromise

	let episodeData = await page.evaluate(() => {
		let episodes = []
		let episodesElms = document.querySelectorAll('.episode-table-cell')
		episodesElms.forEach(episode => {
			let episodesJson = {}

			try {
				const played = episode.parentElement.parentElement.classList.contains(
					'played'
				)
				episodesJson.name = episode.querySelector('.title').innerText
				episodesJson.podcast = episode.querySelector(
					'.text-secondary span'
				).innerText

				episodesJson.image = episode.querySelector('.small-image').src
				episodesJson.date = episode.parentElement.parentElement.querySelector(
					'.date-text'
				).innerText
				episodesJson.played = played
			} catch (exception) {}
			episodes.push(episodesJson)
		})
		return episodes
	})

	browser.close()
	return episodeData
}

getEpisodes().then(podcasts => {
	console.log(saveMarkdownFiles)
	if (saveMarkdownFiles) {
		empty(saveMarkdownFilesFolder, false, o => {
			for (let pod of podcasts) {

				let slug = `${slugify(pod.name, {
					lower: true,
					remove: /[*+~.()'"!:#@]/g
				})}`
				let outputFile = `${saveMarkdownFilesFolder}/${slug}.md`

				fs.writeFile(outputFile, YAML.stringify({ pod }) + '---', function(
					err
				) {
					if (err) {
						return console.log(err)
					}

					console.log(`✅ Saved ${outputFile} !`)
				})
			}
		})
	} else {
		console.log(podcasts)
	}
})
