import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { GetListsQuery } from "@/graphql/types/graphql";
import { Maximize2, Trash2 } from "lucide-react";
import { gql } from "@apollo/client";
import { useAuthedMutation } from "@/hooks/useAuthRequest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/router";

type Props = { refetch: () => Promise<any> };
type List = GetListsQuery["lists"][0];

const deleteList = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id)
  }
`;

export default function ListCard({ name, id, refetch, ...props }: Props & List) {
  const [deleteFn] = useAuthedMutation(deleteList, { variables: { id }, onCompleted: refetch });
  const router = useRouter();
  return (
    <Card className="flex flex-col overflow-clip">
      <CardHeader>
        <span className="flex justify-between group">
          <CardTitle className="font-medium text-card-foreground/80">{name}</CardTitle>
          <div
            onClick={() => {
              router.push(`/list/${props.slug}`);
            }}
            className="p-1 translate-x-1 duration-75 group-hover:translate-x-0 transition-all bg-muted/70 group-hover:visible invisible rounded-md border-muted-foreground/10 border"
          >
            <Maximize2 strokeWidth={2.2} className="text-muted-foreground/90 w-4 h-4 "></Maximize2>
          </div>
        </span>
      </CardHeader>
      <CardContent className="grow">
        <ul className="list-none">
          <li>Members: {props.memberCount}</li>
          <li>Items: {props.itemCount}</li>
        </ul>
      </CardContent>
      <CardFooter className="relative group basis-16">
        <AlertDialog>
          <AlertDialogTrigger className="group-hover:visible invisible border bg-destructive/5 text-destructive border-destructive/20 p-1 rounded-md aspect-square absolute bottom-4 right-5 hover:scale-110">
            <Trash2 className="w-4 h-4"></Trash2>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteFn();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
