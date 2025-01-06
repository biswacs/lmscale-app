import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import ChatProvider from "./chat-provider";
import { AgentsProvider } from "./agents-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <AgentsProvider>
          <ChatProvider>{children}</ChatProvider>
        </AgentsProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}
