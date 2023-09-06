import { useAuthedMutation } from '@/hooks/useAuthRequest'
import React from 'react'
import { AddCommentDocument } from '@/graphql/types/graphql';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { newCommentSchema } from '@/types/formSchemas/newCommentSchema';

type Props = {
    itemId: number;
    refetch: (...args: any) => Promise<any>
} & React.HTMLProps<HTMLDivElement>;
export const AddCommentBox = (props: Props) => {
    const [addCommentFn] = useAuthedMutation(AddCommentDocument);
    return (
        <div className="bg-slate-100 rounded-lg pt-2 pb-3 px-4">
            <Formik onSubmit={async (values, {resetForm}) => {

                await addCommentFn({variables: {content: values.content, itemId: props.itemId}})
                console.log(typeof props.refetch)
                await props.refetch();
                resetForm();
            }} validationSchema={toFormikValidationSchema(newCommentSchema)} initialValues={{ content: "" }}>

                {({ values, handleChange }) => <Form>
                    <span className='flex justify-between items-center'>

                        <h3 className="text-sm text-slate-600">new comment</h3>
                        <button type="submit" className="text-xs px-3 py-1 text-slate-50 bg-slate-700 rounded-sm">post</button>
                    </span>
                    <textarea value={values.content} onChange={handleChange} name="content" className="text-sm text-slate-700 font-light h-16 overflow-scroll w-full rounded-md bg-slate-50 
                focus:outline-primary outline-none border-slate-300 border-[1px] focus:border-transparent mt-4 outline-1 p-1 resize-none">
                    </textarea>
                </Form>}
            </Formik>
        </div>
    )
}
