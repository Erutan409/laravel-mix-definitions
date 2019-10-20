<h1 align="center">
    Laravel Mix Definitions
    <br>
    <a href="https://www.npmjs.com/package/laravel-mix-definitions"><img src="https://img.shields.io/npm/v/laravel-mix-definitions.svg?style=for-the-badge" alt="npm" /></a> <a href="https://www.npmjs.com/package/laravel-mix-definitions"><img src="https://img.shields.io/npm/dt/laravel-mix-definitions.svg?style=for-the-badge" alt="npm" /></a>
</h1>

Add and/or update definitions for the webpack build, using Laravel Mix.

Read more about how definitions work with the [Define Plugin](https://webpack.js.org/plugins/define-plugin/).

## Installation

```bash
npm install laravel-mix-definitions --save-dev
```

## Usage

```js
const mix = require('laravel-mix');
require('laravel-mix-definitions').installPlugin(mix);

mix.definition('$', 'jQuery');
mix.definition('_', 'lodash');

// an object can be passed, too:
mix.definition({
    $: 'jQuery',
    _: 'lodash'
});
```