import React, { useState } from "react";

export type Suggestion = {
  title: string;
  desc?: React.ReactNode;
  action: () => void;
};

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { title: "item", desc: "fasdf   ", action: () => {} },
    { title: "item", desc: "fasdf   ", action: () => {} },
  ]);
  return (
    <div className="">
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((sug, i) => (
            <SuggestionItem {...sug} key={sug.title + i}></SuggestionItem>
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

function SuggestionItem(props: Suggestion) {
  return (
    <li className="p-1.5 border-slate-200 border-b-[1px] last:border-b-0">
      <h3 className="text-secondary-foreground">{props.title}</h3>
      <p className="text-sm text-muted-foreground">{props.desc}</p>
    </li>
  );
}
