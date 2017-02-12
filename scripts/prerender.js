const { resolve } = require('path');
const fs = require('fs');
const pkg = require('../package.json');

const settings = {
  version: pkg.version,
};

const html = () => {
  return (`<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'>

    <meta name='language' content='EN'>
    <meta name='robots' content='index,follow'>

    <title>Let's Design React App</title>

    <link rel='stylesheet' media='screen' href='/assets/global.v${settings.version}.css'>
    <link rel='stylesheet' media='screen' href='/assets/main.v${settings.version}.css'>
  </head>
  <body>

    <div id='mount-point' class='clearfix'></div>

    <script src='/assets/polyfills.v${settings.version}.js' charset='utf-8'></script>
    <script src='/assets/vendor.v${settings.version}.js' charset='utf-8'></script>
    <script src='/assets/main.v${settings.version}.js' charset='utf-8'></script>
  </body>
</html>`);
};

const prerender = (pageName) => {
  console.log(`Rendering "${pageName}.html"...`);

  fs.writeFileSync(resolve(__dirname, '../build', `${pageName}.html`), html(), (err) => {
    if (err) {
      console.log(`Error while rendering ${resolve(__dirname, '../build', `${pageName}.html`)}`, err);
    }
  });
};

console.log(`Prerender index.html v${settings.version}`);

prerender('index');

console.log('Done');
