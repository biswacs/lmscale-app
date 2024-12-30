import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import PlaygroundProvider from "./playground-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <PlaygroundProvider>{children}</PlaygroundProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}
