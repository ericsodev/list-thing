import React, { useEffect, useMemo, useState } from "react";
import { useCommand } from "./CommandContext";
import useThrottled from "@/hooks/useThrottledValue";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export type Suggestion = {
  title: NonNullable<React.ReactNode>;
  desc?: React.ReactNode;
  action?: () => void;
  shortcut?: React.ReactNode;
};

const itemRegex = /^([^#\s]+(?:[^#\n\t\r])*)((?:#[^#\s][^#\n\t\r]*)*)/gm;
const tagClasses = "px-1 py-0.5 bg-primary/30 rounded-md text-xs";
export default function Suggestions() {
  const [{ mode, input }, setCmd] = useCommand();
  const throttledInput = useThrottled(input);
  const [tagParent] = useAutoAnimate();

  const suggestions = useMemo<Suggestion[]>(() => {
    const normalSuggestions: Suggestion[] = [
      {
        title: "create",
        desc: "add an item",
        action: () => {
          setCmd({ mode: "create" });
        },
        shortcut: ":c",
      },
      {
        title: "delete",
        desc: "delete an item",
        action: () => {
          setCmd({ mode: "delete" });
        },
        shortcut: ":d",
      },
      {
        title: "search",
        desc: "search for items",
        action: () => {
          setCmd({ mode: "search" });
        },
        shortcut: "/",
      },
    ];
    if (mode === "normal") {
      return normalSuggestions;
    } else if (mode === "create") {
      const tokens = [...throttledInput.matchAll(itemRegex)][0];
      if (!tokens) {
        return [];
      }
      let [name, tagStrs] = tokens.slice(1);
      name = name.trim();
      console.log(tagStrs);
      let tags = tagStrs
        .split("#")
        .map((tag) => tag.trim())
        .filter((t) => t.length > 0);
      tags = [...new Set(tags)];
      return [
        {
          title: name,
          desc: (
            <>
              <div className="flex flex-wrap gap-1.5" ref={tagParent}>
                {tags.map((tag) => (
                  <div key={tag} className={tagClasses}>
                    {tag}
                  </div>
                ))}
              </div>
            </>
          ),
          shortcut: "enter",
        },
      ];
    }
    return [];
  }, [mode, setCmd, throttledInput, tagParent]);
  return (
    <div className="">
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((sug, i) => <SuggestionItem {...sug} key={i}></SuggestionItem>)
        ) : (
          <p className="p-3 text-muted-foreground text-center font-light text-sm">
            there are no suggestions
          </p>
        )}
      </ul>
    </div>
  );
}

function SuggestionItem(props: Suggestion) {
  return (
    <li
      className="flex py-2 px-3 cursor-pointer border-slate-200 border-b-[1px] last:border-b-0 hover:bg-slate-200/30"
      onClick={props.action}
    >
      <div>
        <h3 className="text-secondary-foreground text-sm">{props.title}</h3>
        <p className="text-xs text-muted-foreground">{props.desc}</p>
      </div>
      {props.shortcut && (
        <div className="ml-auto text-xs min-w-[1.5rem] text-center font-medium text-slate-500 py-1 px-1.5 rounded-md border-slate-200 border-[1px] bg-slate-200/40 self-center">
          {props.shortcut}
        </div>
      )}
    </li>
  );
}
