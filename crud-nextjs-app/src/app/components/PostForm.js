"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import EditPostForm from "./EditPostForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Body is required" }),
});

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost) => {
      const uniquePost =
        createdPost.id === 101
          ? { ...createdPost, id: `${createdPost.id}-${Date.now()}` }
          : createdPost;
      queryClient.setQueryData(["posts"], (oldPosts = []) => [
        uniquePost,
        ...oldPosts,
      ]);
      reset();
    },
    onError: (error) => {
      console.error("Error creating post", error);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="p-4 card shadow-md bg-white text-black dark:bg-neutral dark:text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <input
        {...register("title")}
        placeholder="Title"
        className="input input-bordered w-full mb-2 bg-slate-100 text-black dark:bg-neutral dark:text-white"
      />
      <textarea
        {...register("body")}
        placeholder="Body"
        className="textarea textarea-bordered w-full mb-2 bg-slate-100 text-black dark:bg-neutral dark:text-white"
      ></textarea>
      {errors.body && <p className="text-error mb-2">{errors.body.message}</p>}
      <button
        type="submit"
        className="btn btn-primary rounded-full w-1/8 ml-auto text-slate-100"
      >
        Create
      </button>
    </form>
  );
}
