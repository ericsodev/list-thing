import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";

export default function Authenticated({ children }: React.PropsWithChildren): React.ReactNode {
  const {
    loading,
    session: { authed },
  } = useAuth();
  const router = useRouter();
  if (loading) return <div>loading</div>;
  else if (authed) return <>{children}</>;
  router.push("/login");
  return <div>you are not logged in</div>;
}
