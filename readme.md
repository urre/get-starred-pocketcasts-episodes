# Get your starred podcasts episodes from Pocket Cast

## What?

+ Use [Puppeteer - Headless Chrome Node API](https://github.com/GoogleChrome/puppeteer) to get your starred podcast epiodes from Pocket Cast
+ Get podcast title, podcast, date, image status (played/not played)
+ Get results as JSON.
+ This script also converts the JSON to YAML, for using in static site generators like Jekyll, Gatsby etc.

> Currently wip

## Requirements

NodeJS

## Setup

```shell
npm install
```

Rename `.env-example` to `.env` and add your credentials

```shell
cp .env-example .env
```

## Run
```shell
node index.js
```

## Results
```yml
---
  podcasts:
    -
      name: "Remembering Roy Hargrove, Who Brought Jazz History Into Tomorrow"
      podcast: "Popcast"
      image: "https://static2.pocketcasts.com/discover/images/webp/200/24f9a050-1b0c-012e-006e-00163e1b201c.webp"
      date: "November 9"
      played: true
    -
      name: "128 – Näääk/Matar Samba Del 2 av 2"
      podcast: "Gatuslang"
      image: "https://static2.pocketcasts.com/discover/images/webp/200/6cbdbba0-e7c3-012f-9714-723c91aeae46.webp"
      date: "November 3"
      played: false
    -
      name: "38: Cameras, phones & camera phones, with MKBHD"
      podcast: "The Stalman Podcast"
      image: "https://static2.pocketcasts.com/discover/images/webp/200/eeca35d0-b2bc-0135-9e5e-5bb073f92b78.webp"
      date: "November 10"
      played: false
    -
      name: "Titiyo Hemma hos Strage"
      podcast: "Hemma hos Strage"
      image: "https://static2.pocketcasts.com/discover/images/webp/200/8502e000-4cbe-0134-ec0b-0d50f522381b.webp"
      date: "Yesterday"
      played: false
    -
```


## Todo

- [x] Login
- [x] Get starred podcasts
- [x] Save as YML
- [ ] Save as Markdown


## Author
Urban Sandén. I'm [@urre](https://twitter.com/Urre) on Twitter.

## License
MIT 2018 Urban Sandén
