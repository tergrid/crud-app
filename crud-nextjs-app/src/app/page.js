"use client";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">CRUD App with JSONPlaceholder</h1>
      <PostForm />
      <PostList />
    </div>
  );
}
