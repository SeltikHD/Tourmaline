<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const { user } = useUserSession();
const toast = useToast();
const token = ref("");
const tokenLoading = ref(true);

const profilePicture = computed(
    () =>
        user.value?.picture ||
        (user.value?.avatarUrl as string | undefined) ||
        "https://www.gravatar.com/avatar/?d=mp&s=160"
);

const displayName = computed(
    () =>
        user.value?.name ||
        user.value?.preferred_username ||
        user.value?.email ||
        "usuário"
);

onMounted(async () => {
    try {
        const response = await $fetch<{ accessToken: string }>(
            "/api/auth/token"
        );
        token.value = response.accessToken;
    } catch {
        toast.add({
            title: "Sessão indisponível",
            description: "Faça login novamente para obter o token.",
            color: "error",
        });
    } finally {
        tokenLoading.value = false;
    }
});

async function copyToken() {
    await navigator.clipboard.writeText(token.value);
    toast.add({
        title: "Token copiado",
        description: "O JWT está disponível na área de transferência.",
        color: "success",
    });
}
</script>

<template>
    <div class="min-h-screen bg-zinc-950 text-zinc-100">
        <main class="mx-auto max-w-5xl px-6 py-12">
            <div class="mb-10">
                <p class="text-sm font-medium text-emerald-400">
                    área protegida
                </p>
                <h1 class="mt-2 text-3xl font-bold text-white">
                    Informações da autenticação
                </h1>
                <p class="mt-3 text-zinc-400">
                    Estes dados foram obtidos da sessão autenticada pelo
                    Keycloak.
                </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <UCard class="border border-zinc-800 bg-zinc-900/80">
                    <div class="flex flex-col items-center text-center">
                        <img
                            :src="profilePicture"
                            :alt="`Foto de ${displayName}`"
                            class="h-28 w-28 rounded-3xl object-cover ring-2 ring-emerald-400/40"
                        />
                        <h2 class="mt-5 text-xl font-semibold text-white">
                            {{ displayName }}
                        </h2>
                        <p class="mt-1 text-sm text-zinc-400">
                            {{ user?.email || "E-mail não informado" }}
                        </p>
                    </div>
                    <dl
                        class="mt-8 space-y-4 border-t border-zinc-800 pt-6 text-sm"
                    >
                        <div class="flex justify-between gap-4">
                            <dt class="text-zinc-500">Usuário</dt>
                            <dd class="text-right text-zinc-200">
                                {{ user?.preferred_username || "—" }}
                            </dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-zinc-500">Identificador</dt>
                            <dd
                                class="max-w-48 truncate text-right text-zinc-200"
                            >
                                {{ user?.sub || "—" }}
                            </dd>
                        </div>
                    </dl>
                </UCard>

                <UCard class="border border-zinc-800 bg-zinc-900/80">
                    <template #header>
                        <div class="flex items-center justify-between gap-4">
                            <div>
                                <h2 class="font-semibold text-white">
                                    Access token JWT
                                </h2>
                                <p class="mt-1 text-xs text-zinc-500">
                                    Para testes manuais nos microsserviços
                                    locais.
                                </p>
                            </div>
                            <UButton
                                color="primary"
                                variant="soft"
                                size="sm"
                                icon="i-heroicons-clipboard-document"
                                :disabled="!token || tokenLoading"
                                @click="copyToken"
                            >
                                Copiar
                            </UButton>
                        </div>
                    </template>
                    <USkeleton v-if="tokenLoading" class="h-48 w-full" />
                    <UTextarea
                        v-else
                        v-model="token"
                        readonly
                        :rows="9"
                        autoresize
                        class="w-full font-mono text-xs"
                        aria-label="Token JWT"
                    />
                    <p class="mt-3 text-xs text-amber-400/80">
                        Não compartilhe este token. Ele concede acesso enquanto
                        estiver válido.
                    </p>
                </UCard>
            </div>
        </main>
    </div>
</template>
