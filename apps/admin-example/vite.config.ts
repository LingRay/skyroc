import { defineConfig } from '@skyroc/web-admin-vite';
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default defineConfig({
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: 'vite',
      })
    ]
  },

  application: {
    css: {
      additionalData: '@use "@/styles/scss/global.scss" as *;'
    },
    // monorepo 内 shell 源码在 packages/web/admin；独立项目用默认值 src/framework
    resolve: {
      shellAlias: '../../packages/web/admin'
    },
    server: {
      port: 9528
    }
  }
});
