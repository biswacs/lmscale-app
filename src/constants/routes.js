export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard",
    CHAT: "/dashboard/chat",
    PROFILE: "/dashboard/profile",
    PROMPT: "/dashboard/prompt",
    FUNCTIONS: "/dashboard/functions",
    INSTRUCTIONS: "/dashboard/instructions",
    SETTINGS: "/dashboard/settings",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};

export const AUTHENTICATED_ROUTES = [...Object.values(ROUTES_MAP.DASHBOARD)];
export const UNAUTHENTICATED_ROUTES = [ROUTES_MAP.LOGIN, ROUTES_MAP.REGISTER];
