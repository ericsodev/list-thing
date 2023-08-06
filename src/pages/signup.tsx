import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import gql from "graphql-tag";
import Link from "next/link";
import React, { useEffect } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { client } from "./_app";
import { SearchUserQuery } from "@/graphql/types/graphql";
import { userSchema } from "@/types/formSchemas/userSchema";
import { NextRouter, useRouter } from "next/router";
import { useAuth } from "@/components/AuthContext";

export default function CreateAccountPage() {
  const router = useRouter();
  const {
    session: { authed },
    refetch,
  } = useAuth();

  if (authed) {
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen p-2 grid grid-cols-[1fr_minmax(auto,_500px)_1fr] w-full items-center">
      <div className="bg-slate-100 px-8 md:px-16 pb-10 rounded-md col-start-2 col-end-3">
        <h1 className="text-2xl font-medium text-slate-950 text-center my-12">create account</h1>

        <Formik
          validationSchema={toFormikValidationSchema(userSchema)}
          initialValues={{ name: "", password: "" }}
          onSubmit={async (val) => {
            await submit(val, router, refetch);
          }}
          isInitialValid={false}
          validate={validate}
        >
          {({ isSubmitting, errors, values, handleChange }) => {
            return (
              <Form className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1 text-slate-600 font-medium text-sm">username</label>
                  <TextInput
                    name="name"
                    className="w-full"
                    value={values.name}
                    onChange={handleChange}
                  ></TextInput>
                  <label className="block mt-2 text-red-500 text-sm min-h-[1.25rem]">
                    {errors.name}
                  </label>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 font-medium text-sm">password</label>
                  <TextInput
                    name="password"
                    type="password"
                    className="w-full"
                    value={values.password}
                    onChange={handleChange}
                  ></TextInput>
                  <label className="block mt-2 text-red-500 text-sm min-h-[1.25rem]">
                    {errors.password}
                  </label>
                </div>
                <div className="mt-4">
                  <Button className="w-full" color="green" type="submit">
                    create account
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

const createAccountMutation = gql`
  mutation createAccount($name: String!, $password: String!) {
    createAccount(input: { name: $name, password: $password })
  }
`;

const userSearchQuery = gql`
  query searchUser($input: UserSearchInput!) {
    users(input: $input) {
      name
    }
  }
`;
async function validate(values: z.infer<typeof userSchema>) {
  const { data, errors } = await client.query<SearchUserQuery>({
    query: userSearchQuery,
    variables: {
      input: {
        name: values.name,
      },
    },
  });
  if (data.users.length === 0) return {};

  return {
    name: "This username has been taken",
  };
}

async function submit(
  values: z.infer<typeof userSchema>,
  router: NextRouter,
  refetchToken: () => Promise<void>,
) {
  const { errors } = await client.mutate({
    mutation: createAccountMutation,
    variables: {
      name: values.name,
      password: values.password,
    },
  });
  if (!errors) {
    await refetchToken();
    router.push("/dashboard");
  }
}
