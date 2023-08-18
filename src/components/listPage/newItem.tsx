import { newItemSchema } from "@/types/formSchemas/newItemSchema";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormLabel from "../FormLabel";
import TextInput from "../TextInput";
import gql from "graphql-tag";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { twMerge } from "tailwind-merge";

// const createItem = gql`
// mutation CreateItem {

// }
// `
export default function NewItem({ className }: React.HTMLProps<HTMLFormElement>) {
  const [tagInput, setTagInput] = useState();
  return (
    <Formik
      validationSchema={toFormikValidationSchema(newItemSchema)}
      initialValues={{ name: "", tags: [] as string[] }}
      onSubmit={() => {}}
    >
      {({ errors, values, handleChange }) => {
        return (
          <Form className={twMerge("flex flex-col gap-6", className)}>
            <div>
              <FormLabel className="text-muted-foreground">item name</FormLabel>
              <TextInput
                value={values.name}
                onChange={handleChange}
                name="name"
                className="bg-slate-100 py-1 px-1.5 text-sm"
                placeholder="item name"
              ></TextInput>
              <FormLabel className="text-destructive font-light">{errors.name && " "}</FormLabel>
            </div>
            <div>
              <FormLabel className="text-muted-foreground">tag name</FormLabel>
              <TextInput
                className="bg-slate-100 py-1 px-1.5 text-sm"
                onChange={handleChange}
                placeholder="tags"
              ></TextInput>
              <FormLabel className="text-destructive font-light">{errors.tags && " "}</FormLabel>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
