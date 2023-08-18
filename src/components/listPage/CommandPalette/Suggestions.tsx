import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useCommand } from "./CommandContext";
import useThrottled from "@/hooks/useThrottledValue";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { twMerge } from "tailwind-merge";
import { useKeyPress } from "@/hooks/useKeyPress";

export type Suggestion = {
  title: NonNullable<React.ReactNode>;
  desc?: React.ReactNode;
  action?: () => void;
  shortcut?: React.ReactNode;
};

const itemRegex = /^([^#\s]+(?:[^#\n\t\r])*)((?:#[^#\s][^#\n\t\r]*)*)/gm;
const tagClasses = "px-1 py-0.5 bg-primary/30 rounded-md text-xs";
export default function Suggestions() {
  const [{ mode, input, selectedSuggestion }, setCmd] = useCommand();
  const throttledInput = useThrottled(input);

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
      const parsedInput = parseCreateInput(throttledInput);
      if (!parsedInput) return [];
      const [name, tags] = parsedInput;
      return [
        {
          title: (
            <>
              <strong className="font-medium">create item: </strong>
              {name}
            </>
          ),
          desc: (
            <>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <div key={tag} className={tagClasses}>
                    {tag}
                  </div>
                ))}
              </div>
            </>
          ),
        },
      ];
    }
    return [];
  }, [mode, setCmd, throttledInput]);

  useEffect(() => {
    if (suggestions.length > 0 && selectedSuggestion === undefined) {
      setCmd({ selectedSuggestion: 0, suggestedAction: suggestions[0].action });
    }
  }, [suggestions, setCmd, selectedSuggestion]);

  return (
    <div className="">
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((sug, idx) => (
            <SuggestionItem idx={idx} {...sug} key={idx}></SuggestionItem>
          ))
        ) : (
          <p className="p-3 text-muted-foreground text-center font-light text-sm">
            there are no suggestions
          </p>
        )}
      </ul>
    </div>
  );
}

function SuggestionItem(props: Suggestion & { idx: number }) {
  const [{ selectedSuggestion }] = useCommand();

  return (
    <li
      className={twMerge(
        "flex py-2 px-3 cursor-pointer border-slate-200 border-b-[1px] last:border-b-0 hover:bg-slate-200/30",
      )}
      onClick={props.action}
    >
      <div>
        <span className="text-secondary-foreground block text-sm">{props.title}</span>
        <span className="text-xs text-muted-foreground block">{props.desc}</span>
      </div>
      <div className="ml-auto flex gap-1.5">
        {props.shortcut && (
          <div className="ml-auto text-xs min-w-[1.5rem] text-center font-medium text-slate-500 py-1 px-1.5 rounded-md border-slate-200 border-[1px] bg-slate-200/40 self-center">
            {props.shortcut}
          </div>
        )}
        {selectedSuggestion === props.idx && (
          <div className="ml-auto text-xs min-w-[1.5rem] text-center font-medium text-slate-500 py-1 px-1.5 rounded-md border-slate-200 border-[1px] bg-slate-200/40 self-center">
            enter
          </div>
        )}
      </div>
    </li>
  );
}

function parseCreateInput(input: string): [name: string, tags: string[]] | undefined {
  const tokens = [...input.matchAll(itemRegex)][0];
  if (!tokens) return undefined;

  let [name, tagStrs] = tokens.slice(1);
  name = name.trim();
  let tags = tagStrs
    .split("#")
    .map((tag) => tag.trim())
    .filter((t) => t.length > 0);

  tags = [...new Set(tags)];

  return [name, tags];
}
