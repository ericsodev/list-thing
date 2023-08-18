import React, { useState, useMemo, useCallback, useRef, ElementRef } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useKeyPress } from "@/hooks/useKeyPress";
import { AnimatePresence, animate, motion, useAnimate, useAnimation } from "framer-motion";
import TextInput from "@/components/TextInput";
import Suggestions from "./Suggestions";
import CommandInput from "./CommandInput";
import { CommandProvider } from "./CommandContext";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 350);
  const ani = useAnimation();

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

  const closeFn = useCallback(() => {
    if (!open) return;
    ani.start("close");
    setOpen(false);
  }, [setOpen, ani, open]);

  const openFn = useCallback(() => {
    if (open) return;
    ani.start("open");
    setOpen(true);
  }, [setOpen, ani, open]);

  return (
    <>
      <CommandProvider>
        <AnimatePresence>
          {open && (
            <motion.div
              onClick={closeFn}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-400/10 backdrop-blur-sm inset-0 w-full h-full fixed z-40"
              exit={{ opacity: 0 }}
              transition={{ type: "just" }}
            ></motion.div>
          )}
        </AnimatePresence>
        <motion.div
          animate={ani}
          initial={{
            left: "50%",
            translateX: "-50%",
            translateY: "0",
            top: "90%",
          }}
          variants={{
            open: {
              translateY: "-50%",
              top: "50%",
            },
            close: {
              translateY: "0",
              top: "90%",
            },
          }}
          className="bg-background z-50 border-slate-300 border-[1px] fixed
        min-h-fit drop-shadow-lg rounded-md w-96"
        >
          <div className="w-full border-b-[1px] border-slate-200 py-1">
            <CommandInput {...{ openFn, closeFn }}></CommandInput>
          </div>
          {open && (
            <div className="px-2">
              <Suggestions></Suggestions>
            </div>
          )}
        </motion.div>
      </CommandProvider>
    </>
  );
}
