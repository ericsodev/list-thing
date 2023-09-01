import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
type ModalState = {
    open: boolean;
    selectedItemId?: number;
};

function useStore() {
    const store = useRef<ModalState>({ open: false });
    const subscribers = useRef(new Set<() => void>());

    const get = useCallback(() => store.current, []);
    const set = useCallback((val: Partial<ModalState>) => {
        store.current = { ...store.current, ...val };
        subscribers.current.forEach((cb) => cb());
    }, []);
    const subscribe = useCallback((cb: () => void) => {
        subscribers.current.add(cb);
        return () => {
            subscribers.current.delete(cb);
        };
    }, []);

    return { get, set, subscribe };
}

const context = React.createContext<ReturnType<typeof useStore> | undefined>(undefined);

export default function ModalContextProvider({ children }: React.PropsWithChildren) {
    return <context.Provider value={useStore()}>{children}</context.Provider>;
}

export function useModalStore() {
    const store = useContext(context);
    if (!store) {
        throw Error("useModalStore must be used within a provider");
    }

    const [state, setState] = useState(store.get());

    useEffect(() => {
        return store.subscribe(() => setState(store.get()));
    }, [setState, store]);

    return [state, store.set] as const;
}
