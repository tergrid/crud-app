"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

export default function PostForm() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      reset();
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
      <button type="submit" className="btn btn-primary w-full">
        Create Post
      </button>
    </form>
  );
}
