# Myturn-bot 

Bot for scraping various California vaccination sites for available COVID-19 appointments 

## Install

Requires node.js and npm. Also requires Chrome to be installed

`npm install`

## Run vaccine appointment scraper bot

`npm run bot`

Outputs a custom report to ./tests_output

Note that this does NOT run in headless mode, since certain sites have some kind of bot detection that causes failures. If you want to experiment with headless, you can remove the comment on line 24 of nightwatch.conf.js 

## Customization

You can edit the variables at the top of `./scripts/myturn-bot.js` to better match your region. By default it's set to San Francisco county. If using the HTML report, you'll want to change San Francisco-specific text in the template too: `./lib/themes/myturnbot/index.pug` 