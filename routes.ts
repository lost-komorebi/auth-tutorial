// anyone can access this array of routes
export const publicRoutes = ["/"];

// logged in users will redirect to /settings
export const authRoutes = ["/auth/login", "/auth/register"];

// api authentication purpose
export const apiAuthPrefix = "/api/auth";

// the default path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings";
