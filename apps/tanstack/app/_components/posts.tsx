import { useTranslation } from "react-i18next";

import type { RouterOutputs } from "@acme/api";
import { CreatePostSchema } from "@acme/db/schema";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";

import { trpc } from "../trpc";

export function CreatePostForm() {
  const { t } = useTranslation();
  const form = useForm({
    schema: CreatePostSchema,
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const utils = trpc.useUtils();
  const createPost = trpc.post.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.post.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl flex-col gap-4"
        onSubmit={form.handleSubmit((data) => {
          createPost.mutate(data);
        })}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder={t("Title")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder={t("Content")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{t("Create")}</Button>
      </form>
    </Form>
  );
}

export function PostList() {
  const { t } = useTranslation();
  const [posts] = trpc.post.all.useSuspenseQuery();

  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">{t("No posts yet")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((p) => {
        return <PostCard key={p.id} post={p} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
}) {
  const { t } = useTranslation();
  const utils = trpc.useUtils();
  const deletePost = trpc.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete post",
      );
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-primary">{props.post.title}</h2>
        <p className="mt-2 text-sm">{props.post.content}</p>
      </div>
      <div>
        <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={() => deletePost.mutate(props.post.id)}
        >
          {t("Delete")}
        </Button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2
          className={cn(
            "w-1/4 rounded bg-primary text-2xl font-bold",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </h2>
        <p
          className={cn(
            "mt-2 w-1/3 rounded bg-current text-sm",
            pulse && "animate-pulse",
          )}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
