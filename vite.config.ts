import { defineConfig } from 'vite'
import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-vue3-ts-test-wozy/',
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://app-166072354509830337.lititi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/^\/api/', ''),
      }
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
      imports: [
        'vue',
        'vue-router',
        {
          pinia: [
            'storeToRefs', //
          ],
        },
        {
          '@vueuse/core': [
            ['useVModel', '$useVModel'],
            ['useVModels', '$useVModels'],
            ['useDebounceFn', '$useDebounceFn'],
            ['useThrottleFn', '$useThrottleFn'],
          ],
          vant: [
            ['showToast', '$showToast'],
            ['showLoadingToast', '$showLoadingToast'],
            ['showSuccessToast', '$showSuccessToast'],
            ['showFailToast', '$showFailToast'],
            ['closeToast', '$closeToast'],
            ['showDialog', '$showDialog'],
            ['showConfirmDialog', '$showConfirmDialog'],
            ['closeDialog', '$closeDialog'],
          ],
          '@/utils/autoImportFns': [
            ['asyncDelay', '$asyncDelay'], //
            ['simpleFormatDate', '$simpleFormatDate'],
          ],
        },
      ],
    }),
    Components({
      resolvers: [VantResolver()],
      dirs: [
        'src/components', //
        'src/components/*',
      ],
      deep: true, // 是否搜索 dirs 子目录
    }),
    mkcert({
      source: 'coding',
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/var.scss"; @import "@/styles/mixin.scss";`,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '~@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
})
