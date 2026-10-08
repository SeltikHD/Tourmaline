export default defineNuxtRouteMiddleware(async (to) => {
    const { loggedIn, ready, fetch } = useUserSession();

    if (!ready.value) {
        await fetch();
    }

    if (!loggedIn.value) {
        return navigateTo({
            path: "/",
            query: { redirect: to.fullPath },
        });
    }
});
