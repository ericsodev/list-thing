import React, { useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "./ContextProvider";
import { useListContext } from "../listContext";
import { useKeyPress } from "@/hooks/useKeyPress";

export default function Modal() {
    const [modal, setModal] = useModalStore();
    const ref = useRef<HTMLDivElement>();
    const {
        list: { items },
    } = useListContext();
    const item = items.filter((x) => x.id === modal.selectedItemId)[0];
    const handleEsc = useCallback(() => {
        setModal({ open: false, selectedItemId: undefined });
    }, [setModal]);
    useKeyPress("Escape", handleEsc);
    return (
        <AnimatePresence>
            {modal.open && (
                <>
                    <motion.div
                        onClick={() => setModal({ open: false })}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-slate-400/20 backdrop-blur-sm inset-0 w-full h-full fixed z-30"
                        exit={{ opacity: 0 }}
                        transition={{ type: "just" }}
                    >
                        <motion.div
                            tabIndex={0}
                            onClick={(e) => e.stopPropagation()}
                            animate={{ opacity: 1, scale: 1, translateY: 0 }}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                translateX: "-50%",
                                translateY: -300,
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="z-[35] bg-slate-50 p-6 drop-shadow-sm rounded-md absolute inset-y-28 w-full md:w-2/3 2xl:w-1/2 left-1/2"
                        >
                            <h1>{item && item.name}</h1>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
