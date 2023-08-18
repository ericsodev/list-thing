import { getAuthLayout } from "@/components/Authenticated";
import React from "react";
import gql from "graphql-tag";
import { useAuthedQuery } from "@/hooks/useAuthRequest";
import { ListBySlugQuery } from "@/graphql/types/graphql";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ListContextProvider from "@/components/listPage/listContext";
import NewItem from "@/components/listPage/newItem";
import CommandPalette from "@/components/listPage/CommandPalette";
import Head from "next/head";

const getList = gql`
  query ListBySlug($slug: String!) {
    listSlug(slug: $slug) {
      id
      name
      memberCount
      itemCount
      slug
      items {
        id
        name
      }
    }
  }
`;

function ListPage() {
  const router = useRouter();
  const {
    data: list,
    loading,
    error,
    refetch,
  } = useAuthedQuery<ListBySlugQuery>(getList, {
    variables: {
      slug: router.query.slug,
    },
    pollInterval: 60 * 1000,
    fetchPolicy: "cache-and-network",
  });
  if (error || ((!list || !list?.listSlug) && !loading)) {
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
    <div className="pt-32 pb-8 grid grid-cols-[auto_1fr_auto] min-h-screen">
      <Head>
        <title>{list?.listSlug?.name || "Loading List"}</title>
      </Head>
      <ListContextProvider
        value={{
          list,
          refetch: async () => {
            await refetch;
          },
          loading,
        }}
      >
        <CommandPalette></CommandPalette>
        <div className="col-start-2 col-span-1 flex flex-col items-center">
          {!loading && (
            <>
              <h1 className="text-5xl text-slate-800 py-16 font-medium">
                {list?.listSlug && list.listSlug.name}

                {loading && <Skeleton className="w-28 h-[20px] rounded-full" />}
              </h1>
              <div className="mt-4">
                {list?.listSlug && list?.listSlug?.items.length > 0 ? (
                  <ul>{list?.listSlug?.items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
                ) : (
                  <h1 className="text-lg text-muted-foreground">your list is empty</h1>
                )}
              </div>
            </>
          )}
        </div>
      </ListContextProvider>
    </div>
  );
}

ListPage.getLayout = getAuthLayout;

export default ListPage;
