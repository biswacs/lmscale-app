export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard",
    AGENT: "/agent/[slug]",
    CHAT: "/chat",
    MONITORING: "/monitoring",
    PROFILE: "/profile",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};

export const AUTHENTICATED_ROUTES = [...Object.values(ROUTES_MAP.DASHBOARD)];
export const UNAUTHENTICATED_ROUTES = [ROUTES_MAP.LOGIN, ROUTES_MAP.REGISTER];
