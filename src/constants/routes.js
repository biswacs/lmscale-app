export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard/agents",
    AGENT: "/agent/[slug]",
    PROMPT: "/agent/[slug]/prompt",
    FUNCTIONS: "/agent/[slug]/functions",
    INSTRUCTIONS: "/agent/[slug]/instructions",
    CHAT: "/agent/[slug]/chat",
    SETTINGS: "/agent/[slug]/settings",
    PROFILE: "/profile",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
};

const getDashboardRoutes = () => {
  const routes = Object.values(ROUTES_MAP.DASHBOARD);
  const dynamicRoutes = [
    "/agent/:slug",
    "/agent/:slug/prompt",
    "/agent/:slug/functions",
    "/agent/:slug/instructions",
    "/agent/:slug/chat",
    "/agent/:slug/settings",
  ];
  return [...routes, ...dynamicRoutes];
};

export const AUTHENTICATED_ROUTES = getDashboardRoutes();

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
  ROUTES_MAP.HOME,
];
