import React from "react";
import { Suggestion } from "./Suggestions";

export type Mode = "normal" | "search" | "delete" | "create";
type CommandCtx = [
  {
    mode: Mode;
    input: string;
    suggestions: Suggestion[];
    isOpen: boolean;
  },
  (value: Partial<CommandCtx[0]>) => void,
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
  return (
    <commandCtx.Provider
      value={[
        value,
        (v) => {
          setValue((old) => ({ ...old, ...v }));
        },
      ]}
    >
      {children}
    </commandCtx.Provider>
  );
}
export function useCommand() {
  return React.useContext(commandCtx);
}
