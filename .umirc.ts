import {defineConfig} from "umi";

export default defineConfig({
  routes: [
    {path: "/*", component: "test"},
  ],
  npmClient: 'pnpm',
});
