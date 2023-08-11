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
  if (error || (!list?.listSlug && !loading)) {
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
    <div className="pt-32 pb-8 grid grid-cols-12 grid-rows-[fit-content(300px)_auto] min-h-screen">
      <ListContextProvider
        value={{
          list,
          refetch: async () => {
            await refetch;
          },
          loading,
        }}
      >
        <h1 className="col-start-3 col-span-full text-5xl text-slate-800 py-16 font-medium">
          {list?.listSlug && list.listSlug.name}

          {loading && <Skeleton className="w-28 h-[20px] rounded-full" />}
        </h1>
        <div className="col-start-3 col-end-12 grid grid-cols-[minmax(400px,_auto)_auto] auto-rows-auto">
          <div className="col-span-1">
            <NewItem className="w-80"></NewItem>
            <h1 className="">your list is empty</h1>
          </div>
          <div></div>
        </div>
      </ListContextProvider>
    </div>
  );
}

ListPage.getLayout = getAuthLayout;

export default ListPage;
