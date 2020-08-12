# Troubleshooting

<!-- GEN:toc -->
- [Troubleshooting](#troubleshooting)
  - [Running Puppeteer in the cloud](#running-puppeteer-in-the-cloud)
    - [Running Puppeteer on Google App Engine](#running-puppeteer-on-google-app-engine)
    - [Running Puppeteer on Google Cloud Functions](#running-puppeteer-on-google-cloud-functions)
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

### Running Puppeteer on AWS Lambda

AWS Lambda [limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) deployment package sizes to ~50MB. This presents challenges for running headless Chrome (and therefore Puppeteer) on Lambda. The community has put together a few resources that work around the issues:

- https://github.com/alixaxel/chrome-aws-lambda (kept updated with the latest stable release of puppeteer)
- https://github.com/adieuadieu/serverless-chrome/blob/master/docs/chrome.md (serverless plugin - outdated)
