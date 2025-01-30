"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChreateChannelDialog: FC<{
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
}> = ({ dialogOpen, setDialogOpen, workspaceId, userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Channel name must be at least 2 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    console.log(name);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <div className="scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl">
              Create channel
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="scroll-m-4 text-sm font-normal tracking-tight lg:text-base">
                      Channel name
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Channel name"
                        className="my-1"
                      />
                    </FormControl>
                    <FormDescription>
                      <div className="mb-4 scroll-m-4 text-sm font-normal tracking-tight lg:text-base">
                        This is your channel name
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit" className="mt-3">
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChreateChannelDialog;
