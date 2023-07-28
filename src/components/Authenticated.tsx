import React from "react";
import { useAuth } from "./AuthContext";

export default function Authenticated({
  children,
}: React.PropsWithChildren): React.ReactNode {
  const {
    loading,
    session: { authed },
  } = useAuth();
  if (loading) return <div>loading</div>;
  else if (authed) return <>{children}</>;

  return <div>you cannot see this</div>;
}
