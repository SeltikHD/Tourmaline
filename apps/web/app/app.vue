<script setup lang="ts">
const { loggedIn, clear } = useUserSession();
const isLoading = ref(false);

async function handleLogin() {
    isLoading.value = true;
    await navigateTo("/auth/keycloak", { external: true });
}

async function handleLogout() {
    await clear();
    await navigateTo("/");
}
</script>

<template>
    <div class="min-h-screen bg-zinc-950 text-zinc-100">
        <header
            class="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur"
        >
            <div
                class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
            >
                <NuxtLink to="/" class="text-lg font-bold tracking-tight">
                    <span class="text-emerald-400">tourmaline</span>
                    <span class="text-zinc-500">/ platform</span>
                </NuxtLink>
                <nav class="flex items-center gap-3">
                    <NuxtLink
                        v-if="loggedIn"
                        to="/account"
                        class="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                        Minha conta
                    </NuxtLink>
                    <UButton
                        v-if="loggedIn"
                        color="error"
                        variant="soft"
                        size="sm"
                        @click="handleLogout"
                    >
                        Sair
                    </UButton>
                    <UButton
                        v-else
                        color="primary"
                        size="sm"
                        :loading="isLoading"
                        @click="handleLogin"
                    >
                        Entrar com Keycloak
                    </UButton>
                </nav>
            </div>
        </header>

        <NuxtPage />
    </div>
</template>
