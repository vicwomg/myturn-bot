# Myturn-bot 

Bot for scraping various California vaccination sites for available COVID-19 appointments 

## Install

Requires node.js and npm.

`npm install`

## Run vaccine appointment scraper bot

`npm run bot`

Outputs a custom report to ./tests_output

## Customization

You can edit the variables at the top of `./scripts/myturn-bot.js` to better match your region. By default it's set to San Francisco county. If using the HTML report, you'll want to change San Francisco-specific text in the template too: `./lib/themes/myturnbot/index.pug` 