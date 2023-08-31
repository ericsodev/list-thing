import React, { useCallback, useContext, useEffect, useState } from "react";
import { Mode, useCommand } from "./CommandContext";

/**
 *  which action to take depends on the current mode
 *  each mode registers a key and an action
 *
 */

type Action = {
    key: string;
    cb: () => any;
};

type Domain = Mode | "global";

type KeyContextType = {
    registerKey: (mode: Domain, action: Action | Action[]) => void;
    unregisterKey: (mode: Domain, action: Action | Action[]) => void;
};

const KeyContext = React.createContext<KeyContextType>(undefined!);

type RegisteredKeys = Record<Domain, Action[]>;
// careful for memory reference bugs
// careful for callback causing rerendering, maybe useRef instead
export default function KeyHandler({ children }: React.PropsWithChildren) {
    const [{ mode }] = useCommand();

    const [registered, setRegistered] = useState<RegisteredKeys>({
        normal: [],
        create: [],
        delete: [],
        search: [],
        global: [],
    });

    const registerKey = useCallback(
        (mode: Domain, action: Action | Action[]) => {
            setRegistered((curr) => {
                if (action.constructor === Array) {
                    curr[mode] = curr[mode].concat(action);
                } else {
                    curr[mode].push(action as Action);
                }
                return curr;
            });
        },
        [setRegistered],
    );

    const unregisterKey = useCallback(
        (mode: Domain, action: Action | Action[]) => {
            setRegistered((curr) => {
                const newAct = { ...curr };
                if (action.constructor === Array) {
                    action.forEach(
                        (act) =>
                            (newAct[mode] = newAct[mode].filter(
                                (x) => !(x.cb === act.cb && x.key === act.key),
                            )),
                    );
                } else {
                    newAct[mode] = newAct[mode].filter(
                        (x) =>
                            !(x.cb === (action as Action).cb && x.key === (action as Action).key),
                    );
                }
                return newAct;
            });
        },
        [setRegistered],
    );

    const handler = useCallback(
        (e: KeyboardEvent) => {
            // check global
            registered["global"]
                .filter((x) => x.key === e.key)
                .forEach(({ cb }) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cb();
                });

            // check individual modes
            registered[mode]
                .filter((x) => x.key === e.key)
                .forEach(({ cb }) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cb();
                });
        },
        [registered, mode],
    );

    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [handler]);

    return (
        <KeyContext.Provider value={{ registerKey, unregisterKey }}>{children}</KeyContext.Provider>
    );
}

export function useKeyHandler() {
    return useContext(KeyContext);
}
