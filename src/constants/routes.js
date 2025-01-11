export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard/assistants",
    QUBIT: "/assistant/[slug]",
    PROMPT: "/assistant/[slug]/prompt",
    FUNCTIONS: "/assistant/[slug]/functions",
    INSTRUCTIONS: "/assistant/[slug]/instructions",
    CHAT: "/assistant/[slug]/chat",
    SETTINGS: "/assistant/[slug]/settings",
    PROFILE: "/dashboard/profile",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
};

export const AUTHENTICATED_ROUTES = [
  ...Object.values(ROUTES_MAP.DASHBOARD),
  "/assistant/:slug",
  "/assistant/:slug/prompt",
  "/assistant/:slug/functions",
  "/assistant/:slug/instructions",
  "/assistant/:slug/chat",
  "/assistant/:slug/settings",
];

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
  ROUTES_MAP.HOME,
];
