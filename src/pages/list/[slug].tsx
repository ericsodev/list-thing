import { getAuthLayout } from "@/components/Authenticated";
import React from "react";
import { useAuthedQuery } from "@/hooks/useAuthRequest";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListContextProvider from "@/components/listPage/listContext";
import CommandPalette from "@/components/listPage/CommandPalette";
import Head from "next/head";
import { GetListSlug, SearchItems } from "@/components/listPage/graphql";
import ItemList from "@/components/listPage/ItemList";

function ListPage() {
  const router = useRouter();
  const { data, loading, error, refetch } = useAuthedQuery(GetListSlug, {
    variables: {
      slug: router.query.slug,
    },
    pollInterval: 60 * 1000,
    fetchPolicy: "cache-and-network",
  });
  if (error || (!data && !loading)) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="relative">
          <h3 className="text-xl absolute -top-3/4">uh oh</h3>
          <h1 className="text-4xl font-medium">list not found</h1>
          <Link href="/dashboard">
            <Button
              variant={"outline"}
              className="-bottom-[calc(100%+2rem)] absolute inset-x-0 w-full"
            >
              back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 grid grid-cols-[auto_1fr_auto] h-screen max-h-screen overflow-auto">
      <Head>
        <title>{data?.list?.name || "Loading List"}</title>
      </Head>
      <ListContextProvider
        value={{
          list: data?.list!,
          refetch: async () => {
            await refetch();
          },
          loading,
        }}
      >
        <CommandPalette></CommandPalette>
        <div className="col-start-2 max-h-full col-span-1 flex flex-col items-center">
          <div className="sticky py-16 -top-16 backdrop-blur-sm w-full text-center bg-white/90">
            <h1 className="text-5xl text-slate-800 font-medium">{data?.list && data.list.name}</h1>
            {loading && !data?.list && <Skeleton className="w-56 mx-auto h-[30px] rounded-lg" />}
          </div>

          <div className="mt-4 max-h-full grid grid-cols-[1fr_minmax(auto,500px)_1fr] w-full">
            <div className=""></div>
            <ItemList className="max-h-full overflow-y-scroll shrink-0"></ItemList>
            <div className=""></div>
          </div>
        </div>
      </ListContextProvider>
    </div>
  );
}

ListPage.getLayout = getAuthLayout;

export default ListPage;
