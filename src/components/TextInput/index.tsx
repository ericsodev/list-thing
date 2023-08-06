import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  [x: string]: any;
};
export default function TextInput({
  className,
  ...props
}: Props & React.HTMLProps<HTMLInputElement>): React.ReactNode {
  return (
    <input
      className={twMerge(
        className,
        "bg-slate-200 rounded-md font-light py-1.5 pr-1.5 pl-2.5 text-slate-500 shadow-sm",
      )}
      {...props}
    />
  );
}
