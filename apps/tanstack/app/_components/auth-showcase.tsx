import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@acme/ui/button";

export function AuthShowcase() {
  const session = useSession();

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session.data?.user) {
    return (
      <Button
        size="lg"
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.data.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
