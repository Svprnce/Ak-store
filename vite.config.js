import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv';


dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, 'src'),
  //   build: {
  //     outDir: '../dist'
  //   },
    // server: {
    //   port: 8080
    // },
    define: {
      'process.env': process.env
    },
    plugins: [react()],
})


// export default {
// }