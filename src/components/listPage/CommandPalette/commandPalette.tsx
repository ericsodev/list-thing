import React, { useState, useMemo } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useKeyPress } from "@/hooks/useKeyPress";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 200);

  const [itemName, itemTags] = useMemo((): [string, string[]] => {
    if (debouncedInput.startsWith("/")) return ["", []];
    const regex =
      /^([^\s#]+(?:[ ][^\s#]+)*)[ ]{0,1}((?:(?:#[^\s#]+(?:[ ]{0,1}[^\s#]+)*)[ ]{0,1})*)$/gm;

    // parse tags
    const matches = debouncedInput.trim().matchAll(regex);
    const matchArr = [...matches][0];
    if (!matchArr || !matchArr[1]) return ["", []];
    console.log(matchArr[2]);
    console.log(
      matchArr[2]
        .split("#")
        .filter((x) => x.length > 0)
        .map((x) => x.trimEnd()),
    );
    return [matchArr[1], matchArr[2].split(" ") || []];
  }, [debouncedInput]);

  useKeyPress("/", () => {
    setOpen(true);
  });

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={input}
        onValueChange={setInput}
        placeholder="Create an item or search with /"
      ></CommandInput>
      <CommandList>
        <CommandEmpty>
          {itemTags.map((x, i) => (
            <p key={i}>{x}</p>
          ))}
        </CommandEmpty>
        <CommandGroup>
          <CommandItem>Search</CommandItem>
          <CommandItem>Another thing</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
