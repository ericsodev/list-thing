import React, { useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "./ContextProvider";
import { useListContext } from "../listContext";
import { useKeyPress } from "@/hooks/useKeyPress";
import { Minimize2, Plus } from "lucide-react";

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
                            className="z-[35] bg-slate-50 p-6 drop-shadow-sm rounded-md absolute inset-y-28 w-full md:w-1/2 2xl:w-1/3 left-1/2"
                        >
                            <div className="flex flex-col h-full gap-2">
                                <span className="flex">
                                    <div>
                                        <h1 className="text-lg text-slate-600">item</h1>
                                        <h1 className="font-medium text-2xl text-secondary-foreground">
                                            {item && item.name}
                                        </h1>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="ml-auto self-start text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/70 aspect-square p-1 rounded-lg"
                                        onClick={() =>
                                            setModal({ open: false, selectedItemId: undefined })
                                        }
                                    >
                                        <Minimize2 className="w-5 mx-[2px]" />
                                    </motion.button>
                                </span>
                                <span className="flex gap-1.5">
                                    {item.tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="px-2 py-1 bg-primary/30 rounded-md text-xs"
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                    <div className="px-2 py-0.5 bg-slate-200/70 rounded-md text-xs flex items-center">
                                        <Plus className="h-3.5 inline-block mr-1" />
                                        add tag
                                    </div>
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
