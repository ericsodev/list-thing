import { GetTokenQuery, LogoutMutation, User } from "@/graphql/types/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { getTokenQuery, logoutMutation } from "./graphql";
import { setContext } from "@apollo/client/link/context";
import { client } from "@/pages/_app";

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
  const { data, refetch, loading } = useQuery<GetTokenQuery>(getTokenQuery, {
    pollInterval: 10 * 60 * 1000,
  });
  const [logout] = useMutation<LogoutMutation>(logoutMutation);
  let user: User | undefined = undefined;
  if (data) {
    user = jwt.decode(data.token) as User;
  }
  return (
    <AuthContext.Provider
      value={{
        session: {
          token: data?.token,
          user,
          authed: !!data,
        },
        loading,
        logout: async () => {
          await logout();
          client.resetStore();
        },
        refetch: async () => {
          await refetch();
          setContext((_, { headers }) => {
            return {
              headers: {
                ...headers,
                authorization: data?.token,
              },
            };
          });
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
