// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/hints",
        "@nuxt/image",
        "@nuxt/test-utils/module",
        "@nuxt/ui",
        "@artmizu/nuxt-prometheus",
        "@formkit/auto-animate/nuxt",
        "nuxt-auth-utils",
    ],
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
});
