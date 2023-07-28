import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userSchema, User } from "@/types/formSchemas/userSchema";
import {
  MutationFunction,
  MutationResult,
  gql,
  useMutation,
} from "@apollo/client";
import { client } from "./_app";
import { NextRouter, useRouter } from "next/router";
import { CUSTOM_ERR, CUSTOM_ERR_MSGS } from "@/graphql/errorCodes";
import { LoginMutation } from "@/graphql/types/graphql";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [loginFn, loginState] = useMutation<LoginMutation>(loginMutation, {
    errorPolicy: "all",
  });
  const router = useRouter();
  return (
    <div className="p-2 grow grid grid-cols-[1fr_minmax(auto,_500px)_1fr] w-full items-center min-h-screen">
      <div className="bg-slate-100 px-8 md:px-16 pb-10 rounded-md col-start-2 col-end-3 relative overflow-clip">
        <h1 className="text-2xl font-medium text-slate-950 text-center my-12">
          log in
        </h1>

        <Formik
          validationSchema={toFormikValidationSchema(userSchema)}
          initialValues={{ name: "", password: "" }}
          onSubmit={async (values, helpers) => {
            await submit(values, helpers, router, loginFn, loginState);
          }}
        >
          {({ isSubmitting, errors, values, handleChange, touched }) => {
            return (
              <Form className="flex flex-col gap-4">
                {isSubmitting && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-50/60"></div>
                )}
                <div>
                  <label className="block mb-1 text-slate-600 font-medium text-sm">
                    username
                  </label>
                  <TextInput
                    name="name"
                    className="w-full"
                    value={values.name}
                    onChange={handleChange}
                  ></TextInput>
                  <label className="block mt-2 text-red-500 text-sm min-h-[1.25rem]">
                    {touched.name && errors.name}
                  </label>
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 font-medium text-sm">
                    password
                  </label>
                  <TextInput
                    name="password"
                    type="password"
                    className="w-full"
                    value={values.password}
                    onChange={handleChange}
                  ></TextInput>
                  <label className="block mt-2 text-red-500 text-sm min-h-[1.25rem]">
                    {touched.password && errors.password}
                  </label>
                </div>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="text-sm text-slate-500 text-center mx-auto block mb-3 font-medium hover:text-sky-500"
                  >
                    don&apos;t have an account? create one here.
                  </Link>
                  <Button className="w-full" color="green" type="submit">
                    log in
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

const loginMutation = gql`
  mutation Login($input: AuthenticationInput!) {
    authenticate(input: $input)
  }
`;

async function submit(
  value: User,
  { setErrors, setSubmitting }: FormikHelpers<User>,
  router: NextRouter,
  loginFn: MutationFunction<LoginMutation>,
  loginState: MutationResult<LoginMutation>
) {
  await new Promise((res) => setTimeout(res, 500));
  await loginFn({
    variables: {
      input: {
        name: value.name,
        password: value.password,
      },
    },
  });
  setSubmitting(false);

  if (
    loginState.error?.graphQLErrors.some(
      (e) => e.message === CUSTOM_ERR_MSGS.WR_PASS
    )
  ) {
    setErrors({ password: "Incorrect password" });
  }
  if (
    loginState.error?.graphQLErrors.some(
      (e) => e.message === CUSTOM_ERR_MSGS.NO_USER
    )
  ) {
    setErrors({ name: "User does not exist" });
  }
  if (loginState.error?.graphQLErrors.length === 0) {
    router.push("/dashboard");
  }
}
