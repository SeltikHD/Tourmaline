// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/eslint",
        "@nuxt/hints",
        "@nuxt/image",
        "@nuxt/test-utils/module",
        "@nuxt/ui",
        "@artmizu/nuxt-prometheus",
        "@formkit/auto-animate/nuxt",
    ],
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
});
