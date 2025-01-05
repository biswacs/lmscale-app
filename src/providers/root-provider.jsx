import AuthenticationProvider from "./authentication-provider";
import UserProvider from "./user-provider";
import { SidebarProvider } from "./sidebar-provider";
import ChatProvider from "./chat-provider";
import { PromptProvider } from "./prompt-provider";
import { FunctionsProvider } from "./functions-provider";
import { InstructionsProvider } from "./instructions-provider";

export default function RootProvider({ children }) {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <SidebarProvider>
          <ChatProvider>
            <PromptProvider>
              <FunctionsProvider>
                <InstructionsProvider>{children}</InstructionsProvider>
              </FunctionsProvider>
            </PromptProvider>
          </ChatProvider>
        </SidebarProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}
