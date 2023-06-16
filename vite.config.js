import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import postCssPxToRem from "postcss-pxtorem"
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';
const url2 = "http://192.168.8.174:7997";// 测试
const url3 = "http://192.168.8.223:9000";// 司本地
const url = url2;
export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vue(),
    createStyleImportPlugin({
      resolves: [VantResolve()],
      // 如果没有你需要的resolve，可以在lib内直接写
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => {
            if (name == 'show-toast') {
              return `../es/toast/style/index`; //修改vant引入路径
            } else {
              return `../es/${name}/style/index`; //修改vant引入路径
            }
          },
        },
      ],
    }),
  ],
  base: './',
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          exclude: /vant/i
        })
      ]
    }
  },
  server: {
    proxy: {
      "/apizfbh5": {
        target: url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apizfbh5/, ""),
      },
    },
  },
})
