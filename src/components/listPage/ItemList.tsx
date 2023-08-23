import React from "react";
import { useListContext } from "./listContext";
import { twMerge } from "tailwind-merge";

export default function ItemList({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  const { list } = useListContext();
  return (
    <div className={twMerge("flex h-full flex-col gap-2", className)}>
      {list.items.length > 0 &&
        list.items.map((item) => (
          <span
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
      {list.itemCount === 0 && (
        <h1 className="text-lg text-muted-foreground">your list is empty</h1>
      )}
    </div>
  );
}
