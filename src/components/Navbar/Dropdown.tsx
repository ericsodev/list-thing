import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAuth } from "../AuthContext";
import { twMerge } from "tailwind-merge";

const linksUnauthed = [
  { href: "/login", label: "log in" },
  { href: "/signup", label: "sign up" },
  { href: "/about", label: "about" },
];
const linksAuthed = [
  { href: "/dashboard", label: "dashboard" },
  { href: "/account", label: "account" },
  { href: "/about", label: "about" },
  { href: "/logout", label: "log out" },
];
export default function Dropdown({ className }: { className?: string }) {
  const {
    session: { authed },
  } = useAuth();
  return (
    <Menu as="div" className={twMerge("relative", className)}>
      {({ open }) => {
        return (
          <>
            <Menu.Button className="p-1.5 bg-slate-100 rounded-md hover:bg-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Menu.Button>
            {open && (
              <Menu.Items
                className="absolute w-48 right-0 top-0 mt-12 p-3 bg-slate-100 rounded-lg drop-shadow-md"
                static
              >
                <div className="flex flex-col gap-2 w-fit">
                  {(authed ? linksAuthed : linksUnauthed).map((link) => (
                    <Menu.Item key={link.href} as={Fragment}>
                      <a href={link.href} className="p-1 w-fit">
                        {link.label}
                      </a>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            )}
          </>
        );
      }}
    </Menu>
  );
}
