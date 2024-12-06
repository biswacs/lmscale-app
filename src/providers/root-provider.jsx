import AuthenticationProvider from "./authentication-provider";

export default function RootProvider({ children }) {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
}
