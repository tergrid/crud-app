"use client";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function Home() {
  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <h1 className="text-5xl font-extrabold bg-[linear-gradient(90deg,_#7480FF_5%,_#FF52D9_10%,_#00CDB7_15%)] bg-clip-text text-transparent">
        WriteUp
      </h1>
      <PostForm />
      <PostList />
    </div>
  );
}
