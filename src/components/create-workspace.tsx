"use client";

import { FaPlus } from "react-icons/fa6";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/image-upload";
import { createWorkspace } from "@/actions/create-workspace";
import { toast } from "sonner";
import { useCreateWorkspaceValues } from "@/hooks/create-workspace-values";
import { useState } from "react";

const CreateWorkspace = () => {
  const router = useRouter();
  const { imageUrl, updateImageUrl } = useCreateWorkspaceValues();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name should be at least 2 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const slug = slugify(name, { lower: true });
    const invite_code = uuid();

    const result = await createWorkspace({ imageUrl, name, slug, invite_code });

    setIsSubmitting(false);

    if (result?.error) {
      console.log(result.error);
      return toast.error("Error creating workspace");
    }

    form.reset();
    updateImageUrl("");
    setIsOpen(false);
    router.refresh();
    toast.success("Workspace created successfully");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-2 p-2">
          <Button variant="secondary">
            <FaPlus />
          </Button>
          <Typography text="Add Workspace" variant="p" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <div className="scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl">
              Create workspace
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Name" variant="p" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormDescription>This is your workspace name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUpload />

            <Button disabled={isSubmitting} type="submit">
              <Typography text="Submit" variant="p" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
