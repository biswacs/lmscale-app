export const ROUTES_MAP = {
  DASHBOARD: {
    __: "/dashboard",
    SETTINGS: "/dashboard/settings",
    ACCOUNT: "/dashboard/account",
    DEPLOY: "/dashboard/deploy",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};

export const AUTHENTICATED_ROUTES = [...Object.values(ROUTES_MAP.DASHBOARD)];
export const UNAUTHENTICATED_ROUTES = [ROUTES_MAP.LOGIN, ROUTES_MAP.REGISTER];
