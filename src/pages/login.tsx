import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const formSchema = z.object({
  user: z
    .string({ required_error: "A username is required" })
    .max(30, "Your username  cannot exceed 30 characters")
    .refine(
      (user) => user.match(/^\S+$/)?.length === 1,
      "Your username cannot contain whitespace"
    ),
  password: z
    .string({ required_error: "A password is required" })
    .min(2, "Your password must be at least 8 characters long."),
});

export default function Login() {
  return (
    <div className="min-h-screen p-2 bg-slate-200 grid grid-cols-[1fr_minmax(auto,_500px)_1fr] w-full items-center">
      <div className="bg-slate-100 px-8 md:px-16 pb-10 rounded-md col-start-2 col-end-3">
        <h1 className="text-2xl font-medium text-slate-950 text-center my-12">
          create account
        </h1>

        <Formik
          validationSchema={toFormikValidationSchema(formSchema)}
          initialValues={{ user: "", password: "" }}
          onSubmit={(val) => {}}
          isInitialValid={false}
        >
          {({ isSubmitting, isValid, errors, values, handleChange }) => {
            return (
              <Form className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1 text-slate-600 font-medium text-sm">
                    username
                  </label>
                  <TextInput
                    name="user"
                    className="w-full"
                    value={values.user}
                    onChange={handleChange}
                  ></TextInput>
                  <label className="block mt-2 text-red-500 text-sm min-h-[1.25rem]">
                    {errors.user}
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
                    {errors.password}
                  </label>
                </div>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="text-sm text-slate-500 text-center mx-auto block mb-3 font-medium hover:text-sky-500"
                  >
                    don&apos;t have an account? create one here.
                  </Link>
                  <Button className="w-full" color="green">
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
