import React, { useCallback } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Suggestions from "./Suggestions";
import CommandInput from "./CommandInput";
import { useCommand } from "./CommandContext";

export default function CommandPalette() {
    const [cmd, setCmd] = useCommand();
    const ani = useAnimation();

    const closeFn = useCallback(() => {
        if (!cmd.isOpen) return;
        ani.start("close");
        setCmd({ isOpen: false });
    }, [cmd.isOpen, ani, setCmd]);

    const openFn = useCallback(() => {
        if (cmd.isOpen) return;
        ani.start("open");
        setCmd({ isOpen: true });
    }, [setCmd, ani, cmd.isOpen]);

    return (
        <>
            <AnimatePresence>
                {cmd.isOpen && (
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
                        // translateY: "-50%",
                        top: "35vh",
                        height: "auto",
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
                {cmd.isOpen && <Suggestions></Suggestions>}
            </motion.div>
        </>
    );
}
