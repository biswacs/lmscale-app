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
};

export const AUTHENTICATED_ROUTES = [
  ...Object.values(ROUTES_MAP.DASHBOARD),
  "/dashboard/prompt",
  "/dashboard/functions",
  "/dashboard/instructions",
  "/dashboard/chat",
  "/dashboard/settings",
];

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
  ROUTES_MAP.HOME,
];
