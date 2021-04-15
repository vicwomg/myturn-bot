const zipcode = "94110";
const county = "San Francisco";
const state = "California"
//ageRange possible values (include spaces): "16 - 49", "50 - 64", "65 - 74", "75 and older"
const ageRange = "18 and older";
// businessIndustry possible values: "Chemical and hazardous materials", "Communications and IT", "Critical manufacturing", "Defense",
// "Education and childcare", "Emergency services", "Energy", "Financial services", "Food and Agriculture", "Government operations / community based essential functions"
// "Healthcare Worker", "Industrial, commercial, residential, and sheltering facilities and services", "Retired", "Transportation and logistics",
// "Transportation and logistics: Public Transit/Airport and Commercial Airlines", "Unemployed", "Water and wastewater", "Other", "Other: Janitor"
const businessIndustry = "Education and childcare";

const firstName = "Shelly";
const lastName = "Senbei";
const phoneNumber = "2095224129";
const email = "shellysenb123@gmail.com";
const dobMonth = "January";
const dobDay = "2";
const dobYear = "1986";
const addressLine1 = "762 Mission St.";
const addressCity = "San Francisco";
const addressState = "CA";
const addressPostalCode = "94110";

module.exports = {
  'Myturn.ca.gov: has available appointments': function (browser) {
    const apptHeader = 'h2[data-testid=section-header]'
    const url = 'https://myturn.ca.gov/'
    browser
      .url(url)
      .waitForElementVisible('body')
      .click('button[data-testid=landing-page-continue]')
      .click('input#q-screening-privacy-statement')
      .click(`input[id="q-screening-eligibility-age-range-${ageRange}"]`)
      .click('input#q-screening-different-county-No')
      .click(`option[value="${county}"]`)
      .click('input#q-screening-18-yr-of-age')
      .click('input#q-screening-health-data')
      .click('button[data-testid=continue-button]')
      .click('button[data-testid=location-search-page-continue]')
      .setValue('input#location-search-input', zipcode)
      .click('button[data-testid=location-search-page-continue]')
      .waitForElementVisible(apptHeader)
      .getText(apptHeader, function(result) {
        const available = !result.value.includes("No appointments are available")
        browser.assert.ok(available, `Myturn.ca.gov available appointments: "${result.value}" ${url}`)
        browser.assert.visible('button[data-testid=location-select-location-continue]', "Myturn.ca.gov shows Select Location button")
      })
  },

  'CCSF: has available appointments': function (browser) {
    const ccsfContinueButton = 'button[data-test="submit"]'
    const url = "https://www.primarybio.com/r/ccsf-public"
    var availableShots = []
    browser
      .url(url)
      .waitForElementVisible(ccsfContinueButton)
      .click(ccsfContinueButton)
      .click('xpath', '//input[contains(@name,"ca_resident") and @value="yes"]')
      .click('xpath', '//input[contains(@name,"certify_eligibility") and @value="yes"]')
      .click(ccsfContinueButton)
      .setValue('input[name="first_name"]', firstName)
      .setValue('input[name="last_name"]', lastName)
      .setValue('input[name="phone_number"]', phoneNumber)
      .setValue('input[name="email"]', email)
      .click('div.test-dob-month')
      .click('xpath', `//div[text()="${dobMonth}"]`)
      .click('div.test-dob-day')
      .click('xpath', `//div[text()="${dobDay}"]`)
      .click('div.test-dob-year')
      .click('xpath', `//div[text()="${dobYear}"]`)
      .click(ccsfContinueButton)
      .setValue('input#user-address-1', addressLine1)
      .setValue('input#user-city', addressCity)
      .setValue('input#user-state', addressState)
      .setValue('input#user-postal-code', addressPostalCode)
      .click('input[name="asian"]')
      .click('div#gender_string')
      .click('xpath', '//div[text()="Prefer not to disclose"]')
      .click(ccsfContinueButton)
      .click('xpath', '//button[contains(text(),"Moderna")]')
      .pause(500)
      .getText('div.my-5', function(result) {
        !result.value.includes("No more slots") && availableShots.push("Moderna")
        // browser.verify.ok(!result.value.includes("No more slots"), "CCSF Moderna shots are available: " + url)
      })
      .click('xpath', '//button[contains(text(),"Pfizer")]')
      .pause(500)
      .getText('div.my-5', function(result) {
        !result.value.includes("No more slots") && availableShots.push("Pfizer")
        browser.verify.ok(availableShots.length > 0, `CCSF shots are available: ${availableShots}` )
      })
      .click('xpath', '//button[contains(text(),"Drive-Th")]')
      .pause(500)
      .getText('div.my-5', function(result) {
        !result.value.includes("No more slots") && availableShots.push("Pfizer")
        browser.verify.ok(availableShots.length > 0, `CCSF shots are available: ${availableShots}` )
      })
      .click('xpath', '//button[contains(text(),"Pedestrian")]')
      .pause(500)
      .getText('div.my-5', function(result) {
        !result.value.includes("No more slots") && availableShots.push("Pfizer")
        browser.verify.ok(availableShots.length > 0, `CCSF shots are available: ${availableShots}` )
      })
    },

  'Safeway: has available appointments': function (browser) {
    const apptHeader = 'h2[data-testid=section-header]'
    const ccsfContinueButton = 'input[data-test="submit"]'
    const url = 'https://www.mhealthappointments.com/covidappt'
    browser
      .url(url)
      .waitForElementVisible('body')
      .setValue('input#covid_vaccine_search_input', zipcode)
      .click('input#fifteenMile-covid_vaccine_search')
      .click('button.company-search-btn')
      .waitForElementVisible('div.store-list-row')
      .execute(function () {
        //need to js find this because of the aria-hidden attribute hides from selenium
        const availableApptSafewayLocator = '//div[contains(@class,"store-list-row")]//span[text()="yes" or text()="Yes" or text()="Limited Availability"]/parent::div/parent::div//label'
        const node = document.evaluate(availableApptSafewayLocator, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        if (node && node.innerText) {
          return node.innerText
        }
        else return false;
      }, [], function(result) {
        browser.verify.ok(result.value, `Safeway appointments are available: ${url}`)
      })
  },

  "Walgreens: has available appointments": function (browser) {
    const url = "https://www.walgreens.com/findcare/vaccination/covid-19/";
    const zipcodeField = "input#inputLocation";
    const alert = "div.alert span > p";
    browser
      .url(url)
      .click("xpath", '//span[text()="Schedule new appointment"]')
      .clearValue(zipcodeField)
      .setValue(zipcodeField, zipcode)
      .click("xpath", '//button[text()="Search"]')
      .waitForElementVisible(alert)
      .getText(alert, function (result) {
        browser.assert.ok(
          result.value.includes("Appointments available"),
          "Walgreens available appointiments: " + url
        );
      });
  },

  "CVS: has available appointments": function (browser) {
    const url = "https://www.cvs.com/immunizations/covid-19-vaccine";
    browser
      .url(url)
      .click('xpath', `//span[@class="link__text" and text()="${state}"]`)
      .pause(2000)
      .getText('xpath', `//span[@class='city' and contains(text(), "${addressCity.toLowerCase()}")]/parent::td/parent::tr//span[@class="status"]`, 
        function(result) {
          browser.assert.ok(result.value == "Available", `Available appointments found in ${addressCity}: ${result.value}`)
        })
  },
};
