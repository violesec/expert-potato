# Troubleshooting

<!-- GEN:toc -->
- [Troubleshooting](#troubleshooting)
  - [Running Puppeteer in the cloud](#running-puppeteer-in-the-cloud)
    - [Running Puppeteer on Google App Engine](#running-puppeteer-on-google-app-engine)
    - [Running Puppeteer on Google Cloud Functions](#running-puppeteer-on-google-cloud-functions)
    - [Running Puppeteer on Heroku](#running-puppeteer-on-heroku)
    - [Running Puppeteer on AWS Lambda](#running-puppeteer-on-aws-lambda)
<!-- GEN:stop -->


<details>
<summary>Debian (e.g. Ubuntu) Dependencies</summary>

```
ca-certificates
fonts-liberation
gconf-service
libappindicator1
libappindicator3-1
libasound2
libatk-bridge2.0-0
libatk1.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgbm1
libgcc1
libgconf-2-4
libgdk-pixbuf2.0-0
libglib2.0-0
libgtk-3-0
libnspr4
libnss3
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
lsb-release
wget
xdg-utils
```
</details>

## Running Puppeteer in the cloud

### Running Puppeteer on Google App Engine

The Node.js runtime of the [App Engine standard environment](https://cloud.google.com/appengine/docs/standard/nodejs/) comes with all system packages needed to run Headless Chrome.

To use `puppeteer`, simply list the module as a dependency in your `package.json` and deploy to Google App Engine. Read more about using `puppeteer` on App Engine by following [the official tutorial](https://cloud.google.com/appengine/docs/standard/nodejs/using-headless-chrome-with-puppeteer).

### Running Puppeteer on Google Cloud Functions

The Node.js 10 runtime of [Google Cloud Functions](https://cloud.google.com/functions/docs/) comes with all system packages needed to run Headless Chrome.

To use `puppeteer`, simply list the module as a dependency in your `package.json` and deploy your function to Google Cloud Functions using the `nodejs10` runtime.

### Running Puppeteer on Heroku

Running Puppeteer on Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you. To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is https://github.com/jontewks/puppeteer-heroku-buildpack

Ensure that you're using `'--no-sandbox'` mode when launching Puppeteer. This can be done by passing it as an argument to your `.launch()` call: `puppeteer.launch({ args: ['--no-sandbox'] });`.

When you click add buildpack, simply paste that url into the input, and click save. On the next deploy, your app will also install the dependencies that Puppeteer needs to run.

If you need to render Chinese, Japanese, or Korean characters you may need to use a buildpack with additional font files like https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

There's also another [simple guide](https://timleland.com/headless-chrome-on-heroku/) from @timleland that includes a sample project: https://timleland.com/headless-chrome-on-heroku/.

### Running Puppeteer on AWS Lambda

AWS Lambda [limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) deployment package sizes to ~50MB. This presents challenges for running headless Chrome (and therefore Puppeteer) on Lambda. The community has put together a few resources that work around the issues:

- https://github.com/alixaxel/chrome-aws-lambda (kept updated with the latest stable release of puppeteer)
- https://github.com/adieuadieu/serverless-chrome/blob/master/docs/chrome.md (serverless plugin - outdated)
