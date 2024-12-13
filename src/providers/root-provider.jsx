import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>{children}</UserProvider>
    </AuthenticationProvider>
  );
}
