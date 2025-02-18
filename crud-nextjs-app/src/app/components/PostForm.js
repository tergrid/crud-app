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
      queryClient.setQueryData(["posts"], (oldPosts = []) => [
        createdPost,
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
      className="p-4 card shadow-lg"
    >
      <input
        {...register("title")}
        placeholder="Title"
        className="input input-bordered w-full mb-2"
      />
      <textarea
        {...register("body")}
        placeholder="Body"
        className="textarea textarea-bordered w-full mb-2"
      ></textarea>
      <button
        type="submit"
        className="btn btn-primary rounded-full w-1/8 ml-auto"
      >
        Create Post
      </button>
    </form>
  );
}
