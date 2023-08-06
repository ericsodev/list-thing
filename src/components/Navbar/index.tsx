import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import Dropdown from "./Dropdown";
import { linksAuthed, linksUnauthed } from "./links";
import { useAuth } from "../AuthContext";
import Image from "next/image";

type Props = {
  className?: string;
};
export default function Navbar({ className }: Props) {
  const {
    session: { authed },
    logout,
  } = useAuth();

  const linkStyle =
    "sm:text-lg font-medium border-transparent hover:text-slate-800 text-slate-700 p-0.5 sm:p-1 hover:border-green-400 border-b-2 box-border";
  return (
    <div
      className={twMerge(
        "w-full z-30 overflow-visible overflow-y-visible flex p-6 from-slate-800/10 to-transparent bg-gradient-to-b",
        className,
      )}
    >
      <Link href="/" className="text-3xl text-slate-800 font-semibold self-start">
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
      <Image
        onClick={async () => {
          await logout();
        }}
        width={64}
        height={64}
        priority={true}
        className="w-10 h-10 rounded-full"
        alt="profile picture"
        src="https://ui-avatars.com/api/?background=random&color=fff&rounded=true?size=512&bold=true&name=eric"
      ></Image>
    </div>
  );
}
