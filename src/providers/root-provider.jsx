import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import ChatProvider from "./chat-provider";
import { AgentsProvider } from "./agent-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <ChatProvider>
          <AgentsProvider>{children}</AgentsProvider>
        </ChatProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}
