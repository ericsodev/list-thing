import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";
import { Progress } from "@radix-ui/react-progress";

export default function Authenticated({ children }: React.PropsWithChildren): React.ReactNode {
  const {
    loading,
    session: { authed, token },
  } = useAuth();
  const router = useRouter();
  if (!loading && !authed) router.push("/login");
  return (
    <>
      {loading && (
        <div className="w-full h-full absolute z-50 inset-y-0 inset-x-0 animate-bounce flex justify-center items-center">
          <Progress value={50} className="w-1/3"></Progress>
        </div>
      )}
      {authed && <div className="weirdclassname">{children}</div>}
    </>
  );
}

export function getAuthLayout(page: React.ReactElement) {
  return <Authenticated>{page}</Authenticated>;
}
