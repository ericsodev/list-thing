import { twMerge } from "tailwind-merge";

type LabelProps = {
  className?: string;
  children: React.ReactNode;
};
export default function FormLabel(props: LabelProps): React.ReactNode {
  return (
    <label className={twMerge("block mb-1 text-slate-600 font-medium text-sm", props.className)}>
      {props.children}
    </label>
  );
}

export function ErrorLabel(props: LabelProps): React.ReactNode {
  return (
    <label className={twMerge("block mt-2 text-red-500 text-sm min-h-[1.25rem]", props.className)}>
      {props.children}
    </label>
  );
}
