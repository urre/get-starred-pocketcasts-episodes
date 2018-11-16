const puppeteer = require('puppeteer')
const YAML = require('json2yaml')
let yamlText = ''

require('dotenv').config()

const urlLogin = 'https://playbeta.pocketcasts.com/web/settings/account'
const urlStarred = 'https://playbeta.pocketcasts.com/web/starred'

let getEpisodes = async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })

	const navigationPromise = page.waitForNavigation()

	await page.goto(urlLogin, {
		timeout: 3000000
	})

	await page.waitForSelector('.login-form > .email > input')
	await page.type('.login-form > .email > input', process.env.POCKETCAST_USER)
	await page.type(
		'.login-form > .password > input',
		process.env.POCKETCAST_PASSWORD
	)

	await page.click('.login-form > .big-button')
	await page.waitForSelector('.podcasts-content')
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
				episodesJson.date = episode.parentElement.parentElement.querySelector('.date-text').innerText
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
	yamlText = YAML.stringify({
		podcasts
	})

	console.log(yamlText)
})
