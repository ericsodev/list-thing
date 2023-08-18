import React from "react";
import { Suggestion } from "./Suggestions";

export type Mode = "normal" | "search" | "delete" | "create";
interface CommandCtx {
  mode: Mode;
  input: string;
  suggestions: Suggestion[];
  setValue(value: Partial<Omit<CommandCtx, "setValue">>): void;
}
const commandCtx = React.createContext<CommandCtx>({
  mode: "normal",
  suggestions: [],
  input: "",
  setValue: (v) => {},
});

type Props = {} & React.PropsWithChildren;
export function CommandProvider({ children }: Props) {
  const [value, setValue] = React.useState<Omit<CommandCtx, "setValue">>({
    mode: "normal",
    suggestions: [],
    input: "",
  });
  return (
    <commandCtx.Provider
      value={{
        ...value,
        setValue: (v) => {
          setValue((old) => ({ ...old, ...v }));
        },
      }}
    >
      {children}
    </commandCtx.Provider>
  );
}
export function useCommand() {
  return React.useContext(commandCtx);
}
