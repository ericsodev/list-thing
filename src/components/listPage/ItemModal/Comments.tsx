import { useAuthedQuery } from "@/hooks/useAuthRequest";
import React from "react";
import { GetComments } from "../graphql";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCommentBox } from "./AddCommentBox";

type Props = {
    itemId: number;
} & React.HTMLProps<HTMLDivElement>;
export default function Comments({ itemId, className }: Props) {
    const { data, loading, refetch } = useAuthedQuery(GetComments, { variables: { itemId: itemId } });

    return (
        <div className={twMerge("flex flex-col gap-4", className)}>
            <h2 className="text-slate-600 text-sm">Comments</h2>
            <div className="flex rounded-lg flex-col gap-3 h-full overflow-auto">
                {loading &&
                    <>

                        <div className="bg-slate-100 rounded-lg py-4 px-3">
                            <span className="flex">
                                <Skeleton className="w-24 bg-slate-200 h-4"></Skeleton>
                                <Skeleton className="w-16 bg-slate-200 h-4 ml-auto"></Skeleton>
                            </span>
                            <div className="mt-4 pr-1 flex flex-col gap-1">
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-2/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                            </div>
                        </div>
                        <div className="bg-slate-100 rounded-lg py-4 px-3">
                            <span className="flex">
                                <Skeleton className="w-24 bg-slate-200 h-4"></Skeleton>
                                <Skeleton className="w-16 bg-slate-200 h-4 ml-auto"></Skeleton>
                            </span>
                            <div className="mt-4 pr-1 flex flex-col gap-1">
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-2/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                            </div>
                        </div>
                        <div className="bg-slate-100 rounded-lg py-4 px-3">
                            <span className="flex">
                                <Skeleton className="w-24 bg-slate-200 h-4"></Skeleton>
                                <Skeleton className="w-16 bg-slate-200 h-4 ml-auto"></Skeleton>
                            </span>
                            <div className="mt-4 pr-1 flex flex-col gap-1">
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-2/3 bg-slate-200 h-3"></Skeleton>
                                <Skeleton className="w-1/2 bg-slate-200 h-3"></Skeleton>
                            </div>
                        </div>
                    </>
                }
                {data?.getComments?.map(x => 

                    <Comment key={x.id} {...x}></Comment>
                )}
                <AddCommentBox refetch={refetch} itemId={itemId} />
            </div>
        </div>
    );
}


function Comment(p: {text: string, createdOn: Date}): React.ReactNode {
    return <div className="bg-slate-100 rounded-lg py-2 px-3">
        <span className="flex">
            <h3 className="text-sm text-slate-600">user 1</h3>
            <h3 className="text-xs ml-auto">Aug 31, 2023</h3>
        </span>
        <p className="text-sm text-slate-900 font-light mt-2 pr-1">
            {p.text}
        </p>
    </div>
}
