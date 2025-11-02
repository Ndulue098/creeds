"use client"
import { useForm } from "react-hook-form";
import PostTextEditor from "./PostTextEditor";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import UploadForm from "./UploadForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageSchema } from "@/validator/textValidator";

export default function PostForm({onSave,defaultVal={}}) {
     const form=useForm({ 
             resolver:zodResolver(ImageSchema),
             defaultValues:{ 
             ...{image:null,
             article:""},
             ...defaultVal
         }
         }) 
    

    return <div className="max-w-5xl w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)}>
          <UploadForm form={form}/>
          
          <FormField
            control={form.control}
            name="article"
            render={({field})=>(
              <FormItem>
                <FormControl>
                  <PostTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

        <Button type="submit"
          // onClick={() => onSave(content)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {defaultVal ? "Update Post" : "Publish Post"}
          {/* Publish Post */}
        </Button>
          {/* <PostTextEditor onSave={onSave}/> */}
        </form>
      </Form>
    </div>
}

