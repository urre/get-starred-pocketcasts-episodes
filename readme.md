# Get your starred podcasts episodes from Pocket Casts

## What?

### TL;DR
I listen to podcacsts in Pocket Casts. I want to get my starred episodes and share what i listen to on my website. Work in progress.

+ Use [Puppeteer - Headless Chrome Node API](https://github.com/GoogleChrome/puppeteer) to get your starred podcast epiodes from Pocket Cast
+ Get podcast title, podcast, date, image status (played/not played)
+ Get results as JSON.
+ This script also converts the JSON to YAML, for using in static site generators like Jekyll, Gatsby etc.

## Requirements

NodeJS

## Setup

```shell
npm install
```

Rename `.env-example` to `.env` and add your credentials

### Want to save Markdown files? Set this flag to `true`
```yml
SAVE_MARKDOWN_FILES=true
```

```shell
cp .env-example .env
```

## Run
```shell
node index.js
```

## Results
```yml
[ { name: 'Remembering Roy Hargrove, Who Brought Jazz History Into Tomorrow',
    podcast: 'Popcast',
    image: 'https://static2.pocketcasts.com/discover/images/webp/200/24f9a050-1b0c-012e-006e-00163e1b201c.webp',
    date: 'November 9',
    played: true },
  { name: '128 – Näääk/Matar Samba Del 2 av 2',
    podcast: 'Gatuslang',
    image: 'https://static2.pocketcasts.com/discover/images/webp/200/6cbdbba0-e7c3-012f-9714-723c91aeae46.webp',
    date: 'November 3',
    played: false },
  { name: '38: Cameras, phones & camera phones, with MKBHD',
    podcast: 'The Stalman Podcast',
    image: 'https://static2.pocketcasts.com/discover/images/webp/200/eeca35d0-b2bc-0135-9e5e-5bb073f92b78.webp',
    date: 'November 10',
    played: false },
    ...
```

## Results when saving Markdown files
```shell
✅ Saved ./podcasts/remembering-roy-hargrove,-who-brought-jazz-history-into-tomorrow.md !
✅ Saved ./podcasts/38-cameras,-phones-and-camera-phones,-with-mkbhd.md !
✅ Saved ./podcasts/titiyo-hemma-hos-strage.md !
✅ Saved ./podcasts/rick-rubin.md !
✅ Saved ./podcasts/gora-det-omojliga-annika-norlin.md !
✅ Saved ./podcasts/avsnitt-90-helle-klein.md !
✅ Saved ./podcasts/73-skrek-benjamin-ingrosso-fardig-fran-toaletten-anda-upp-i-tonaren?.md !
✅ Saved ./podcasts/johan-kinde-hemma-hos-strage.md !
```


## Todo

- [x] Login
- [x] Get starred podcasts
- [x] Save as YML
- [x] Save as Markdown


## Author
Urban Sandén. I'm [@urre](https://twitter.com/Urre) on Twitter.

## License
MIT 2018 Urban Sandén
