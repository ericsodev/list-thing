import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { GetListsQuery } from "@/graphql/types/graphql";
import { Trash2 } from "lucide-react";
import { gql } from "@apollo/client";
import { useAuthedMutation } from "@/hooks/useAuthRequest";

type Props = { refetch: () => Promise<any> };
type List = GetListsQuery["lists"][0];

const deleteList = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id)
  }
`;

export default function ListCard({ name, id, refetch, ...props }: Props & List) {
  const [deleteFn] = useAuthedMutation(deleteList, { variables: { id }, onCompleted: refetch });
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-medium text-card-foreground/80">{name}</CardTitle>
      </CardHeader>
      <CardContent className="grow">Members: {props.memberCount}</CardContent>
      <CardFooter className="relative group">
        <Trash2
          onClick={async () => {
            await deleteFn();
          }}
          className="bottom-3 right-3 hover:scale-110 transition-transform absolute group-hover:inline hidden text-destructive w-4"
        ></Trash2>
      </CardFooter>
    </Card>
  );
}
