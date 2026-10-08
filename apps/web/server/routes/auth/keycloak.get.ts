import { createHash } from "node:crypto";

export default defineOAuthKeycloakEventHandler({
    config: {
        scope: ["openid", "profile", "email"],
    },
    async onSuccess(event, { user, tokens }) {
        const email = typeof user.email === "string" ? user.email : "";
        const avatarUrl =
            typeof user.picture === "string" && user.picture.length > 0
                ? user.picture
                : `https://www.gravatar.com/avatar/${createHash("md5")
                      .update(email.trim().toLowerCase())
                      .digest("hex")}?d=mp&s=320`;

        await setUserSession(event, {
            user: {
                sub: user.sub,
                name: user.name,
                preferred_username: user.preferred_username,
                email: user.email,
                picture: user.picture,
                avatarUrl,
            },
            secure: {
                accessToken: tokens.access_token,
                // refreshToken: tokens.refresh_token,
                // idToken: tokens.id_token,
            },
        });

        const redirect = getQuery(event).redirect;
        return sendRedirect(
            event,
            typeof redirect === "string" ? redirect : "/"
        );
    },
    onError(event, error) {
        console.error("Keycloak authentication failed:", error);
        return sendRedirect(
            event,
            "/?error=Falha%20na%20autentica%C3%A7%C3%A3o%20com%20Keycloak"
        );
    },
});
