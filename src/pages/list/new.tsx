import Button from "@/components/Button";
import FormLabel, { ErrorLabel } from "@/components/FormLabel";
import TextInput from "@/components/TextInput";
import { NewListSchema, newListSchema, tagInputValidate } from "@/types/formSchemas/newListSchema";
import { ArrayHelpers, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AnimatePresence, motion } from "framer-motion";
import { MutationFunction } from "@apollo/client";
import { CreateList } from "@/graphql/queries";
import { NextRouter, useRouter } from "next/router";
import Authenticated from "@/components/Authenticated";
import { useAuthedMutation } from "@/hooks/useAuthRequest";
import Head from "next/head";
import { CreateListMutation } from "@/graphql/types/graphql";

export default function NewListPage(): React.ReactNode {
  const [tagInput, setTagInput] = useState<string>("");
  const [createFn, createState] = useAuthedMutation(CreateList);
  const router = useRouter();

  return (
    <Authenticated>
      <div className="pt-28 grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_2fr] h-screen">
        <Head>
          <title>list-thing | new list</title>
        </Head>
        <Formik
          initialValues={{ name: "", tags: [] as string[] }}
          onSubmit={handleSubmit(createFn, router)}
          validationSchema={toFormikValidationSchema(newListSchema)}
        >
          {({ values, handleChange, errors, setFieldError }) => (
            <AnimatePresence>
              <motion.div
                transition={{ type: "spring" }}
                className="row-start-2 transition-all h-auto col-start-2 bg-muted pb-8 px-10 rounded-md w-96"
              >
                <Form className="h-full" autoComplete="off">
                  <h1 className="text-2xl font-medium text-slate-950 text-center my-12">
                    create list
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div>
                      <FormLabel>list name</FormLabel>
                      <TextInput
                        placeholder="new list"
                        className="w-full"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                      ></TextInput>
                      <ErrorLabel>{errors.name}</ErrorLabel>
                    </div>
                    <div>
                      <FormLabel>tags</FormLabel>

                      <FieldArray name="tags">
                        {(arrayHelpers: ArrayHelpers) => (
                          <>
                            <TextInput
                              placeholder="new tag"
                              onChange={() => {
                                // validate
                                const result = tagInputValidate.safeParse(tagInput);
                                if (!result.success) {
                                  // error validating
                                  setFieldError("tags", result.error.issues[0].message);
                                  return;
                                }
                                setFieldError("tags", "");
                              }}
                              onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                              }}
                              onKeyUp={(e: React.KeyboardEvent) => {
                                if (e.key !== "Enter") return;

                                // validate and add to field array
                                const result = tagInputValidate.safeParse(tagInput.trim());
                                if (!result.success) {
                                  // error validating
                                  setFieldError("tags", result.error.issues[0].message);
                                  return;
                                }

                                // check duplicates
                                if (values.tags.indexOf(result.data) > -1) {
                                  setFieldError("tags", "Tag already exists");
                                  return;
                                }

                                if (result.data) {
                                  arrayHelpers.push(result.data);
                                }
                                setTagInput("");
                              }}
                              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                //@ts-ignore
                                setTagInput((value) => e.target.value ?? value);
                              }}
                              value={tagInput}
                              className="w-full"
                            ></TextInput>
                            <ErrorLabel>{errors.tags}</ErrorLabel>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {values.tags.map((x, i) => (
                                <motion.span
                                  className="group overflow-clip flex items-center gap-2 py-1 px-2.5 rounded-md text-amber-950 bg-amber-200 text-sm"
                                  key={x}
                                >
                                  {x}
                                  <motion.span
                                    onClick={() => {
                                      arrayHelpers.remove(i);
                                    }}
                                    className="group-hover:visible invisible group-hover:translate-x-0 translate-x-20 duration-150 group-hover:inline-block bg-amber-400 h-5 rounded-md"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                  </motion.span>
                                </motion.span>
                              ))}
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </div>
                    <Button type="submit" color="green" className="w-full mt-6">
                      create list
                    </Button>
                  </div>
                </Form>
              </motion.div>
            </AnimatePresence>
          )}
        </Formik>
      </div>
    </Authenticated>
  );
}

function handleSubmit(createFn: MutationFunction<CreateListMutation>, router: NextRouter) {
  return async (values: NewListSchema) => {
    try {
      const err = await createFn({
        variables: values,
      });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
}
