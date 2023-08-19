import type { ListBySlugQuery } from "@/graphql/types/graphql";
import React, { useContext } from "react";

type Context = {
  list: ListBySlugQuery["listSlug"] | undefined;
  loading: boolean;
  refetch: () => Promise<void>;
};

const context = React.createContext<Context>({
  loading: false,
  refetch: async () => {},
  list: undefined,
});

export default function ListContextProvider({
  children,
  value,
}: { value: Context } & React.PropsWithChildren) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useListContext() {
  return useContext(context);
}
