"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditPostForm({ post, onCancel }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="p-4 card shadow-lg"
    >
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
          Save
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
