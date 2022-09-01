# aws-amplify-vite-and-vue3-my-template

## 概要

このリポジトリは 2022/9 に Amplify ハンズオンが行われたときに、作業を始めやすくした Vue3 + Vite のテンプレートです。

## 行った対応

### Vite による Vue3 用のテンプレート作成

```
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+ は追加で 2 つのダッシュが必要:
npm create vite@latest my-vue-app -- --template vue
```

[はじめに | Vite](https://ja.vitejs.dev/guide/#%E6%9C%80%E5%88%9D%E3%81%AE-vite-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E7%94%9F%E6%88%90%E3%81%99%E3%82%8B) より。

### package.json の修正

[AWS Amplify で Vite 3.0 の Vue テンプレートを amplify publish するときに ES 関連の An error occurred during the push operation が起きるときの対応メモ – 1ft-seabass.jp.MEMO](https://www.1ft-seabass.jp/memo/2022/08/12/aws-amplify-vite3-vue-template-troubleshooting/) の対策。

```js
{
  "name": "vite-vue-starter",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@aws-amplify/ui-vue": "^2.4.18",
    "aws-amplify": "^4.3.33",
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.3.1",
    "vite": "^2.9.7"
  }
}
```

### src/main.js への Amplify 対応

[Tutorial - Set up fullstack project - Vue - AWS Amplify Docs](https://docs.amplify.aws/start/getting-started/setup/q/integration/vue/#install-amplify-libraries) にしたがって、Amplify 関連の記述を追加。


```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

から、

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Amplify Add
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

createApp(App).mount('#app')
```

へ、変更しました。

### index.html への Amplify 対応

[Troubleshooting | Amplify UI for Vue](https://ui.docs.amplify.aws/vue/getting-started/troubleshooting) にしたがって、window.global まわりの対応を追加。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

から

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    <script>
      window.global = window;
      var exports = {};
    </script>
  </body>
</html>
```

に、変更しました。

### vite.config.js への Amplify 対応

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

から、

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 8080
  },
  plugins: [vue()],
  resolve: {
      alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ]
  }
})
```

に、変更しました。

- [Troubleshooting | Amplify UI for Vue](https://ui.docs.amplify.aws/vue/getting-started/troubleshooting) 対応
  - resolve 以下の値を追加
- vite.config.jsでサーバー 8080 で起動するように調整
  - Cloud9 の内部サーバー用のポートが許可されている 8080 に調整


## 詳しいコミットログ

以上の対応をした、詳しいコミットログはこちらでも確認できます。

https://github.com/1ft-seabass/aws-amplify-vite-and-vue3-my-template/commits/main