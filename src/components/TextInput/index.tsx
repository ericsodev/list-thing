import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  value: string;
  name: string;
  type?: string;
  onBlur?: () => void;
  onChange?: (e: any) => void;
  className?: string;
};
export default function TextInput({
  className,
  ...props
}: Props): React.ReactNode {
  return (
    <input
      className={twMerge(
        className,
        "bg-slate-200 rounded-md py-1.5 pr-1.5 pl-2.5 text-slate-500 shadow-sm"
      )}
      {...props}
    />
  );
}
