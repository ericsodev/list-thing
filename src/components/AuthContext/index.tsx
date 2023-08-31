import { GetTokenQuery, LogoutMutation, User } from "@/graphql/types/graphql";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { getTokenQuery, logoutMutation } from "./graphql";

type AuthContext = {
  session: {
    token?: string;
    authed: boolean;
    user?: User;
  };
  loading: boolean;
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = React.createContext<AuthContext>({
  session: { authed: false },
  loading: true,
  refetch: async () => {},
  logout: async () => {},
});

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = useState<AuthContext["session"]>({ authed: false });
  const { data, refetch, loading } = useQuery<GetTokenQuery>(getTokenQuery, {
    pollInterval: 10 * 60 * 1000,
    onCompleted: ({ token }) => {
      let user: User | undefined = undefined;
      user = jwt.decode(token) as User;
      setSession({
        user,
        authed: true,
        token: token,
      });
    },
  });
  const [logout] = useMutation<LogoutMutation>(logoutMutation);
  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        logout: async () => {
          try {
            await logout();
            setSession({ authed: false });
          } catch (err) {}
        },
        refetch: async () => {
          try {
            await refetch();
          } catch (err) {}
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
