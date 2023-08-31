import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../AuthContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { UserCircle2 } from "lucide-react";

const linksAuthed = [
  {
    label: "dashboard",
    href: "/dashboard",
  },
];
const linksUnauthed = [
  {
    label: "about",
    href: "/about",
  },
  {
    label: "sign up",
    href: "/signup",
  },
  {
    label: "log in",
    href: "/login",
  },
];

type Props = {
  className?: string;
};
export default function Navbar({ className }: Props) {
  const {
    session: { authed },
    logout,
  } = useAuth();

  return (
    <NavigationMenu
      className={twMerge("p-3 flex w-full max-w-full bg-white/90 backdrop-blur-sm", className)}
    >
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={twMerge(
                navigationMenuTriggerStyle({ className: "hover:scale-105 transition-transform" }),
                "font-medium text-lg",
              )}
            >
              <strong className="font-semibold text-primary">list</strong>-thing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {(authed ? linksAuthed : linksUnauthed).map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        {authed && (
          <>
            <NavigationMenuItem>
              <Link href="/settings" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/account" legacyBehavior passHref>
                <NavigationMenuLink className={twMerge(navigationMenuTriggerStyle(), "p-4")}>
                  account
                  <UserCircle2 strokeWidth={1.5} className="ml-2 w-5" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
