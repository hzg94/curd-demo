import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/*", component: "index"}
    ],
    npmClient: 'pnpm',
    chainWebpack(memo, { env, webpack }){
        memo.devServer.http2(true)
        // memo.devServer.https(true)
    },
    proxy: {
        '/api': {
            'target': 'http://172.18.33.150:8080',
            'changeOrigin': true,
            'pathRewrite': {'/api': '/'},
        }
    }
});
