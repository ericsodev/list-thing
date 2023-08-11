import { useAuth } from "@/components/AuthContext";
import { getAuthLayout } from "@/components/Authenticated";
import React, { ReactElement, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ListCard from "@/components/dashboard/ListCard";
import gql from "graphql-tag";
import { useAuthedQuery } from "@/hooks/useAuthRequest";
import { GetListsQuery } from "@/graphql/types/graphql";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const getLists = gql`
  query GetLists {
    lists {
      id
      name
      memberCount
      itemCount
      slug
    }
  }
`;

function DashboardPage() {
  const {
    session: { user },
  } = useAuth();
  const {
    data: lists,
    refetch,
    loading,
  } = useAuthedQuery<GetListsQuery>(getLists, {
    pollInterval: 30 * 1000,
    fetchPolicy: "cache-and-network",
  });
  const [parent] = useAutoAnimate();
  return (
    <div className="pt-32 pb-8 grid grid-cols-12 grid-rows-[fit-content(300px)_auto] min-h-screen">
      <h1 className="col-start-3 col-span-full text-5xl text-slate-800 py-16">
        hey, <strong className="font-medium">{user?.name}</strong>
      </h1>
      <div
        ref={parent}
        className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]
        col-start-3 col-span-8 auto-rows-[200px]"
      >
        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="w-full h-[20px] rounded-full" />
              <Skeleton className="w-1/3 h-[20px] rounded-full" />
              <Skeleton className="w-1/2 h-[20px] rounded-full" />
            </CardContent>
          </Card>
        )}
        {!!lists && (
          <>
            {lists?.lists.map((list) => (
              <ListCard refetch={refetch} key={list.id} {...list}></ListCard>
            ))}
            <Link href="/list/new">
              <motion.div
                initial={{
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ type: "spring", bounce: 0.8, damping: 5 }}
                className="shadow-sm border from-card bg-[length:100%_200%] bg-bottom hover:bg-top  
              transition-[background] delay-100 duration-300 ease-in-out bg-gradient-to-t from-50% to-50%
               to-green-100 p-4 h-full rounded-xl flex justify-center items-center text-card-foreground"
              >
                <h1 className="font-medium text-xl">create new</h1>
              </motion.div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

DashboardPage.getLayout = getAuthLayout;

export default DashboardPage;
