import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import ChatProvider from "./chat-provider";
import { QubitsProvider } from "./qubits-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <QubitsProvider>
          <ChatProvider>{children}</ChatProvider>
        </QubitsProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}
