"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/posts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Body is required" }),
});

export default function EditPostForm({ post, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
    resolver: zodResolver(postSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => updatePost(post.id, data),
    onSuccess: (updatedPost) => {
      // Manually update the cached posts to reflect the updated data
      queryClient.setQueryData(["posts"], (oldPosts) =>
        oldPosts.map((p) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        )
      );
      // Exit edit mode
      onCancel();
    },
    onError: (error) => {
      console.error("Update failed", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 card shadow-lg">
      <input
        {...register("title")}
        placeholder="Title"
        className="input input-bordered w-full mb-2"
        defaultValue={post.title}
      />
      <textarea
        {...register("body")}
        placeholder="Body"
        className="textarea textarea-bordered w-full mb-2"
        defaultValue={post.body}
      ></textarea>
      <div className="flex gap-2">
        <button
          type="submit"
          className="btn btn-sm btn-accent btn-outline rounded-full w-sm"
        >
          {mutation.isLoading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="btn btn-sm btn-secondary btn-outline rounded-full w-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
