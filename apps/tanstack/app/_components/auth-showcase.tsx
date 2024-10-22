import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

import { Button } from "@acme/ui/button";

export function AuthShowcase() {
  const session = useSession();
  const { t } = useTranslation();

  if (session.status === "loading") {
    return <div>{t("Loading")} ...</div>;
  }

  if (!session.data?.user) {
    return (
      <div className="flex gap-2">
        <Button
          size="lg"
          onClick={() => {
            signIn("google");
          }}
        >
          {t("Sign in with Google")}
        </Button>
        <Button
          size="lg"
          onClick={() => {
            signIn("emailProvider", { email: "enguerrand@des-vaux.fr" });
          }}
        >
          {t("Sign in with magic link")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>
          {t("Logged in as {{ userName }}", {
            userName: session.data.user.name ?? "unknown",
          })}
        </span>
      </p>

      <form>
        <Button
          size="lg"
          onClick={() => {
            signOut();
          }}
        >
          {t("Sign out")}
        </Button>
      </form>
    </div>
  );
}
