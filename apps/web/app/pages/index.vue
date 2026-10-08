<script setup lang="ts">
const { loggedIn, user } = useUserSession();
const route = useRoute();
const isLoading = ref(false);

const authError = computed(() => {
    const error = route.query.error;
    return typeof error === "string" ? error : null;
});

const displayName = computed(
    () =>
        user.value?.name ||
        user.value?.preferred_username ||
        user.value?.email ||
        "usuário"
);

const profilePicture = computed(
    () =>
        user.value?.picture ||
        (user.value?.avatarUrl as string | undefined) ||
        "https://www.gravatar.com/avatar/?d=mp&s=160"
);

async function handleLogin() {
    isLoading.value = true;
    await navigateTo("/auth/keycloak", { external: true });
}
</script>

<template>
    <main class="mx-auto max-w-6xl px-6 py-16">
        <section class="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
                <p
                    class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400"
                >
                    playground de microsserviços
                </p>
                <h1
                    class="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                    Um ponto de partida simples para o projeto Tourmaline.
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                    Explore os serviços, valide o SSO com Keycloak e use a área
                    protegida para inspecionar a sessão do usuário.
                </p>
                <div class="mt-8 flex flex-wrap gap-3">
                    <UButton
                        v-if="!loggedIn"
                        size="lg"
                        color="primary"
                        :loading="isLoading"
                        @click="handleLogin"
                    >
                        Começar com SSO
                    </UButton>
                    <UButton v-else to="/account" size="lg" color="primary">
                        Abrir minha conta
                    </UButton>
                    <UButton
                        to="https://github.com/SeltikHD/tourmaline"
                        target="_blank"
                        size="lg"
                        color="info"
                        variant="outline"
                    >
                        Ver projeto
                    </UButton>
                </div>
                <UAlert
                    v-if="authError"
                    class="mt-8"
                    color="error"
                    variant="soft"
                    icon="i-heroicons-exclamation-triangle"
                    title="Não foi possível entrar"
                    :description="authError"
                />
            </div>

            <UCard
                v-if="loggedIn"
                class="border border-emerald-500/20 bg-zinc-900/80"
            >
                <div class="flex items-center gap-4">
                    <img
                        :src="profilePicture"
                        :alt="`Foto de ${displayName}`"
                        class="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-400/40"
                    />
                    <div class="min-w-0">
                        <p class="text-sm text-zinc-400">Você está conectado</p>
                        <h2 class="truncate text-xl font-semibold text-white">
                            Olá, {{ displayName }}!
                        </h2>
                    </div>
                </div>
                <p class="mt-6 text-sm leading-6 text-zinc-400">
                    Sua sessão foi validada pelo Keycloak. Acesse sua conta para
                    consultar os dados de autenticação e o JWT.
                </p>
                <UButton to="/account" block class="mt-6" color="primary">
                    Ver dados da sessão
                </UButton>
            </UCard>
            <UCard v-else class="border border-zinc-800 bg-zinc-900/80">
                <template #header>
                    <h2 class="text-lg font-semibold text-white">
                        O que você encontra aqui
                    </h2>
                </template>
                <ul class="space-y-5 text-sm text-zinc-400">
                    <li class="flex gap-3">
                        <UIcon
                            name="i-heroicons-shield-check"
                            class="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        />
                        Login centralizado e seguro com Keycloak.
                    </li>
                    <li class="flex gap-3">
                        <UIcon
                            name="i-heroicons-cube-transparent"
                            class="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        />
                        Base para integrar os microsserviços do monorepo.
                    </li>
                    <li class="flex gap-3">
                        <UIcon
                            name="i-heroicons-command-line"
                            class="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        />
                        Inspeção do token para testes locais de API.
                    </li>
                </ul>
            </UCard>
        </section>
    </main>
</template>
