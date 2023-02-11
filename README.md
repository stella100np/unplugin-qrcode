# unplugin-qrcode

Print the QR code of the server address of Vite or Webpack in the console.

[![NPM version](https://img.shields.io/npm/v/unplugin-qrcode?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-qrcode)

## Install

```bash
npm i unplugin-qrcode
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-qrcode/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>



<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-qrcode/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-qrcode/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-qrcode/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>
