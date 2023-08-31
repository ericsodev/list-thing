import React, { useCallback } from "react";
import { Suggestion } from "./Suggestions";

export type Mode = "normal" | "search" | "delete" | "create";
type CommandCtx = [
    {
        mode: Mode;
        input: string;
        suggestions: Suggestion[];
        isOpen: boolean;
        selectedSuggestion?: number;
    },
    (value: Partial<CommandCtx[0]> | ((curr: CommandCtx[0]) => CommandCtx[0])) => void,
];

const commandCtx = React.createContext<CommandCtx>([
    {
        mode: "normal",
        suggestions: [],
        input: "",
        isOpen: false,
    },
    () => {},
]);

type Props = {} & React.PropsWithChildren;
export function CommandProvider({ children }: Props) {
    const [value, setValue] = React.useState<CommandCtx[0]>({
        mode: "normal",
        suggestions: [],
        input: "",
        isOpen: false,
    });
    const setVal = useCallback(
        (v: Partial<CommandCtx[0]> | ((curr: CommandCtx[0]) => CommandCtx[0])) => {
            if (typeof v === "function") {
                setValue(v);
                return;
            }
            setValue((old) => ({ ...old, ...v }));
        },
        [setValue],
    );
    return <commandCtx.Provider value={[value, setVal]}>{children}</commandCtx.Provider>;
}
export function useCommand() {
    return React.useContext(commandCtx);
}
