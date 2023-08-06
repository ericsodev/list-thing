import { useAuth } from "@/components/AuthContext";
import { useMutation, useQuery } from "@apollo/client";

export function useAuthedQuery<T>(...params: Parameters<typeof useQuery<T>>) {
  const {
    session: { token },
  } = useAuth();
  return useQuery<T>(params[0], {
    ...params[1],
    context: {
      ...params[1]?.context,
      headers: {
        authorization: token,
      },
    },
  });
}

export function useAuthedMutation<T>(
  ...params: Parameters<typeof useMutation<T>>
): ReturnType<typeof useMutation<T>> {
  const {
    session: { token },
  } = useAuth();
  return useMutation<T>(params[0], {
    ...params[1],
    context: {
      ...params[1]?.context,
      token,
    },
  });
}
