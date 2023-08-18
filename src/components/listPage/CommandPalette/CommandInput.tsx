import TextInput from "@/components/TextInput";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useKeyPress } from "@/hooks/useKeyPress";
import useThrottled from "@/hooks/useThrottledValue";
import React, { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { Mode, useCommand } from "./CommandContext";

type Props = {
  openFn: () => void;
  closeFn: () => void;
} & React.HTMLProps<HTMLInputElement>;

const placeholders: { [key in Mode]: string } = {
  normal: "press / to start",
  create: "create",
  delete: "delete",
  search: "search",
};

export default function CommandInput({ closeFn, openFn, ...props }: Props) {
  const [{ mode, input, suggestedAction }, setCmd] = useCommand();
  const ref = useRef<HTMLInputElement>(null);
  const handleEsc = useCallback(() => {
    if (mode !== "normal") {
      setCmd({ mode: "normal", input: "" });
    } else {
      closeFn();
    }
  }, [mode, setCmd, closeFn]);

  const handleSlash = useCallback(() => {
    ref.current?.focus();
    openFn();
  }, [openFn, ref]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      openFn();
      if (mode === "normal") {
        const [newMode, newValue] = getMode(e.target.value);

        setCmd({ mode: newMode, input: newValue });
        return;
      }
      setCmd({ input: e.target.value });
    },
    [setCmd, mode, openFn],
  );

  const handleEnter = useCallback(() => {
    suggestedAction();
  }, [suggestedAction]);

  useKeyPress("Enter", handleEnter, { preventDefault: true, stopProp: true });
  useKeyPress("Escape", handleEsc);
  useKeyPress("/", handleSlash);

  return (
    <TextInput
      {...props}
      ref={ref}
      value={input}
      onChange={handleInput}
      placeholder={placeholders[mode]}
      onFocus={openFn}
      className="placeholder:font-light placeholder:text-sm pl-3.5 placeholder:text-center bg-transparent focus:outline-none w-full shadow-none text-slate-600"
    ></TextInput>
  );
}

function getMode(input: string): [Mode, string] {
  const tokens = input.trim().split(" ");
  const value = tokens[1] || "";
  switch (tokens[0]) {
    case ":c":
      return ["create", value];
    case ":s":
      return ["search", value];
    case "/":
      return ["search", value];
    case ":d":
      return ["delete", value];
    default:
      return ["normal", input];
  }
}
