// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  alias: {
    "~/types": fileURLToPath(new URL("./types", import.meta.url)),
    "~/types/*": fileURLToPath(new URL("./types/*", import.meta.url)),
    "@/types": fileURLToPath(new URL("./types", import.meta.url)),
    "@/types/*": fileURLToPath(new URL("./types/*", import.meta.url)),
  },
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: "Aperture — 摄影艺术与视觉叙事",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "description",
          content: "Aperture 专注于商业摄影、人像写真与品牌视觉叙事。用光影捕捉情绪，让每一帧都成为永恒。",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: `${(process.env.NUXT_APP_BASE_URL || '/').replace(/\/$/, '')}/favicon.ico` },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/api/site-data'],
    },
  },
});

