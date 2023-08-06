import React from "react";
import { twJoin } from "tailwind-merge";
import { motion } from "framer-motion";

type Size = keyof typeof sizeStyle;
type Color = keyof typeof colorStyle;

const colorStyle = {
  gray: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  blue: "bg-blue-100 text-blue-900 hover:bg-blue-200",
  red: "bg-red-300 text-red-900 hover:bg-red-400 hover:text-red-950",
  yellow: "text-amber-950 bg-amber-200 hover:bg-amber-300",
  green: "bg-green-200 text-teal-950 hover:bg-green-300 transition-colors duration-200",
};
const sizeStyle = {
  sm: "text-sm px-2.5 py-1.5",
  md: "px-3 py-1.5 text-base",
  lg: "text-lg px-4 py-1.5",
  xl: "text-xl px-6 py-3",
  "2xl": "text-2xl px-8 py-3",
};

type Props = {
  className?: string;
  size?: Size;
  color?: Color;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
};
export default function Button({
  children,
  className,
  size = "md",
  color = "gray",
  ...props
}: Props & React.PropsWithChildren): React.ReactNode {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", duration: 0.4 }}
      {...props}
      className={twJoin(
        className,
        colorStyle[color],
        sizeStyle[size],
        "block rounded-md font-medium text-center shadow-sm",
      )}
    >
      {children}
    </motion.button>
  );
}
