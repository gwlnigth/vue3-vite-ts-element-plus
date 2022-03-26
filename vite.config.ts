import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
],
  resolve: {
    alias:{
      views:resolve(__dirname,'./src/views'),
      comp:resolve(__dirname,'./src/components'),
      type:resolve(__dirname,'./src/type'),
      css:'/public/css',
    }
  },
  //反向代理
  server: {
    host: '0.0.0.0',
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://imissu.herokuapp.com/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      } 
    }
  }
  
})
