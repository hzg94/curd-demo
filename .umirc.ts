import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/*", component: "test"},
    ],
    npmClient: 'pnpm',
    plugins: ["@umijs/plugins/dist/valtio"],
    valtio: {},
    proxy: {
        '/api': {
            'target': 'http://192.168.1.152:8080',
            'changeOrigin': true,
            'pathRewrite': {'/api': '/'},
        }
    }
});
