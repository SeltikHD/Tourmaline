export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);
    const accessToken = session.secure?.accessToken;

    if (typeof accessToken !== "string" || accessToken.length === 0) {
        throw createError({
            statusCode: 401,
            statusMessage: "Access token unavailable",
        });
    }

    return { accessToken };
});
