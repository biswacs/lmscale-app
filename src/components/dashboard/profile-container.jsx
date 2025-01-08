import { useAuthentication } from "@/providers/authentication-provider";

export function ProfileContainer() {
  const { logOutUser } = useAuthentication();

  return (
    <div className="px-4 py-4">
      <div className="max-w-6xl mx-auto flex justify-end">
        <div className="flex justify-between items-center">
          <button
            onClick={logOutUser}
            className="w-full sm:w-auto bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 font-light"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
