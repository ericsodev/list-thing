import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import Dropdown from "./Dropdown";
import { linksAuthed, linksUnauthed } from "./links";
import { useAuth } from "../AuthContext";

type Props = {
  className?: string;
};
export default function Navbar({ className }: Props) {
  const {
    session: { authed },
  } = useAuth();
  const linkStyle =
    "sm:text-lg font-medium hover:text-slate-800 text-slate-700 p-0.5 sm:p-1 hover:border-green-400 border-b-2 box-border";
  return (
    <div
      className={twMerge(
        "w-full z-30 overflow-visible overflow-y-visible flex p-6 from-slate-800/10 to-transparent bg-gradient-to-b",
        className
      )}
    >
      <Link
        href="/"
        className="text-3xl text-slate-800 font-semibold self-start"
      >
        <text className="text-green-300 font-bold">list</text>-thing
      </Link>
      <Dropdown className="ml-auto md:hidden"></Dropdown>
      <div className="grow md:flex justify-center gap-10 self-center hidden">
        {(authed ? linksAuthed : linksUnauthed).map((link) => (
          <Link key={link.href} href={link.href} className={linkStyle}>
            {link.label}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl hidden md:block select-none text-slate-800 font-semibold self-start opacity-0">
        <text className="text-green-300 font-bold">list</text>-thing
      </h1>
    </div>
  );
}
