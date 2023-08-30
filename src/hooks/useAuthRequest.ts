import { useAuth } from "@/components/AuthContext";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

export function useAuthedQuery<T>(...params: Parameters<typeof useQuery<T>>) {
  const {
    session: { token },
  } = useAuth();
  return useQuery<T>(params[0], {
    ...params[1],
    context: {
      ...params[1]?.context,
      token,
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

export function useAuthedLazy<T>(...params: Parameters<typeof useLazyQuery<T>>) {
  const {
    session: { token },
  } = useAuth();
  return useLazyQuery<T>(params[0], {
    ...params[1],
    context: {
      ...params[1]?.context,
      token,
    },
  });
}
