import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ThemeToggle } from "@acme/ui/theme";

import { AuthShowcase } from "../_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "../_components/posts";

if (typeof window !== "undefined" && !window.process) {
  console.log("window.process", window.process);
  window.process = {} as any;
}

export const Route = createFileRoute("/")({
  component: Home,
  async loader({ context: { trpcQueryUtils } }) {
    await trpcQueryUtils.post.all.ensureData();
  },
});

function Home() {
  return (
    <main className="container h-screen py-16">
      <div className="absolute right-8 top-8">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <AuthShowcase />
        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
