import { GetTokenQuery, User } from "@/graphql/types/graphql";
import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import jwt from "jsonwebtoken";

type AuthContext = {
  session: {
    token?: string;
    authed: boolean;
    user?: User;
  };
  loading: boolean;
  refetch: () => Promise<void>;
};
const AuthContext = React.createContext<AuthContext>({
  session: { authed: false },
  loading: true,
  refetch: async () => {},
});

const getTokenQuery = gql`
  query GetToken {
    token
  }
`;
export default function AuthProvider({ children }: React.PropsWithChildren) {
  const { data, refetch, loading } = useQuery<GetTokenQuery>(getTokenQuery, {
    pollInterval: 10 * 60 * 1000,
  });
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
        refetch: async () => {
          await refetch();
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
