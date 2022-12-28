[![NPM](https://img.shields.io/npm/v/@blackprint/nodes-discord.svg)](https://www.npmjs.com/package/@blackprint/nodes-discord)
[![Build Status](https://github.com/blackprint/template-js/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/blackprint/template-js/actions/workflows/build.yml)

## Discord.js nodes for Blackprint
This module gives you an ability to use [Discord.js](https://discord.js.org/) with [Blackprint](https://github.com/Blackprint/Blackprint). Unlike other module that can directly be used on Browser, this module require you to connect into Node.js via remote engine.

## Import this nodes from URL
Please specify the version to avoid breaking changes.

```js
Blackprint.loadModuleFromURL([
  'https://cdn.jsdelivr.net/npm/@blackprint/nodes-discord@0.0.1/dist/nodes-discord.mjs'
], {
  // Turn this on if you want to load .sf.js, and .sf.css
  // only with single .mjs
  loadBrowserInterface: true // set to "false" for Node.js/Deno
});
```

## Development URL
You can use this link to load unpublished nodes and still under development on GitHub.<br>
https://cdn.jsdelivr.net/gh/blackprint/nodes-discord@dist/nodes-discord.mjs

Replace `dist` with your latest commit hash (from `dist` branch) to avoid cache from CDN.

### License
MIT