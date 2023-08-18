import React, { forwardRef, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  focus?: boolean;
  [x: string]: any;
} & React.HTMLProps<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className, focus, ...props },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  ref = ref || inputRef;

  return (
    <input
      ref={ref}
      className={twMerge(
        "bg-slate-200 rounded-md font-light py-1.5 pr-1.5 pl-2.5 text-slate-500 shadow-sm",
        className,
      )}
      {...props}
    />
  );
});

export default TextInput;
