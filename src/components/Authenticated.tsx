import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";

export default function Authenticated({ children }: React.PropsWithChildren): React.ReactNode {
  const {
    loading,
    session: { authed, token },
  } = useAuth();
  const router = useRouter();
  if (loading) return <div>loading</div>;
  else if (authed && token !== undefined) {
    console.log("returning ur children");
    return <div className="weirdclassname">{children}</div>;
  }
  router.push("/login");
  return <div>you are not logged in</div>;
}

export function getAuthLayout(page: React.ReactElement) {
  return <Authenticated>{page}</Authenticated>;
}
