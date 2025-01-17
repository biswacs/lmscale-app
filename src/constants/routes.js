export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard",
    PROMPT: "/dashboard/prompt",
    FUNCTIONS: "/dashboard/functions",
    INSTRUCTIONS: "/dashboard/instructions",
    SETTINGS: "/dashboard/settings",
    CHAT: "/dashboard/chat",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  DOCS: "/docs",
  BLOGS: "/blogs",
};

export const AUTHENTICATED_ROUTES = [...Object.values(ROUTES_MAP.DASHBOARD)];

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.HOME,
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
];

export const PUBLIC_ROUTES = [ROUTES_MAP.BLOGS, ROUTES_MAP.DOCS];

export const isPublicRoute = (pathname) => PUBLIC_ROUTES.includes(pathname);
export const isAuthenticatedRoute = (pathname) =>
  AUTHENTICATED_ROUTES.includes(pathname);
export const isUnauthenticatedRoute = (pathname) =>
  UNAUTHENTICATED_ROUTES.includes(pathname);
