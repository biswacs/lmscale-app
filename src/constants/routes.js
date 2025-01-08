export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard/qubits",
    QUBIT: "/qubit/[slug]",
    PROMPT: "/qubit/[slug]/prompt",
    FUNCTIONS: "/qubit/[slug]/functions",
    INSTRUCTIONS: "/qubit/[slug]/instructions",
    CHAT: "/qubit/[slug]/chat",
    SETTINGS: "/qubit/[slug]/settings",
    PROFILE: "/dashboard/profile",
  },
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
};

export const AUTHENTICATED_ROUTES = [
  ...Object.values(ROUTES_MAP.DASHBOARD),
  "/qubit/:slug",
  "/qubit/:slug/prompt",
  "/qubit/:slug/functions",
  "/qubit/:slug/instructions",
  "/qubit/:slug/chat",
  "/qubit/:slug/settings",
];

export const UNAUTHENTICATED_ROUTES = [
  ROUTES_MAP.LOGIN,
  ROUTES_MAP.REGISTER,
  ROUTES_MAP.HOME,
];
