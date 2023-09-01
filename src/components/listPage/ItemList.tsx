import React from "react";
import { useListContext } from "./listContext";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/skeleton";
import { useModalStore } from "./ItemModal";

export default function ItemList({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
    const { list, loading } = useListContext();
    const [Modal, setModal] = useModalStore();
    const isLoading = loading && !list;
    return (
        <div className={twMerge("flex h-full flex-col gap-2", className)}>
            {isLoading &&
                [...Array(3)].map((_, i) => (
                    <span
                        key={i}
                        className="flex gap-3 w-full bg-secondary/40 hover:bg-secondary/80 py-2 px-3 rounded-md"
                    >
                        <Skeleton className="w-56 h-[20px] rounded-full" />
                        <Skeleton className="ml-auto w-24 h-[20px] rounded-full" />
                    </span>
                ))}
            {list &&
                list.items.length > 0 &&
                list.items.map((item) => (
                    <span
                        onClick={() => {
                            setModal({ open: true, selectedItemId: item.id });
                        }}
                        key={item.id}
                        className="flex gap-3 w-full bg-secondary/50 hover:bg-secondary/80 py-2 px-3 rounded-md"
                    >
                        <p className="text-sm">{item.name}</p>
                        <div className="ml-auto flex gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                                <div
                                    key={tag.name}
                                    className="p-1 text-secondary-foreground/80 rounded-md bg-slate-200 text-xs"
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </span>
                ))}
            {list && list.itemCount === 0 && (
                <h1 className="text-lg text-center text-muted-foreground">your list is empty</h1>
            )}
        </div>
    );
}
