declare module "#auth-utils" {
    interface User {
        sub?: string;
        name?: string;
        preferred_username?: string;
        email?: string;
        picture?: string;
        avatarUrl?: string;
    }

    interface SecureSessionData {
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
    }
}

export {};
