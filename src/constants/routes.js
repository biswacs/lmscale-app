export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard/agents",
    AGENT: "/agent/[slug]",
    PROMPT: "/agent/[slug]/prompt",
    FUNCTIONS: "/agent/[slug]/functions",
    INSTRUCTIONS: "/agent/[slug]/instructions",
    CHAT: "/agent/[slug]/chat",
    SETTINGS: "/agent/[slug]/settings",
    PROFILE: "/dashboard/profile",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
};

export const AUTHENTICATED_ROUTES = [
  ...Object.values(ROUTES_MAP.DASHBOARD),
  "/agent/:slug",
  "/agent/:slug/prompt",
  "/agent/:slug/functions",
  "/agent/:slug/instructions",
  "/agent/:slug/chat",
  "/agent/:slug/settings",
];

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
  ROUTES_MAP.HOME,
];
