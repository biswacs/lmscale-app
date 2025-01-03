import { useRouter } from "next/navigation";

export function ProfileContainer() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-neutral-800 font-light"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
