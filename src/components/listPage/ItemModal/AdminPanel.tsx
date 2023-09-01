import { ListBySlugQuery } from "@/graphql/types/graphql";
import React from "react";

type Item = NonNullable<ListBySlugQuery["list"]>["items"][0];
type Props = { item: Item } & React.HTMLProps<HTMLDivElement>;
export default function AdminPanel({ className, item }: Props) {
    return <h2 className="text-slate-600 text-sm">Settings</h2>;
}
