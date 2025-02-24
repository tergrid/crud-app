"use client";
import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowSplash(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {showSplash && (
        <div
          onClick={() => setShowSplash(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100 transition-opacity duration-500"
        >
          <h1 className="text-8xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            WriteUp
          </h1>
          <h2 className="text-4xl font-bold text-center text-white mt-4">
            Jot Down Your Ideas
          </h2>
        </div>
      )}
      <header
        className={`fixed top-0 left-0 w-full h-16 p-4 transition-transform duration-500 z-50 bg-white dark:bg-neutral ${
          showSplash
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <h1 className="text-3xl font-bold text-black dark:text-white">
          WriteUp
        </h1>
      </header>
      <main
        className={`transition-opacity duration-500 ${
          showSplash ? "opacity-0" : "opacity-100"
        } pt-20`}
      >
        <div className="max-w-4xl w-full mx-auto p-4">
          <PostForm />
          <PostList />
        </div>
      </main>
    </div>
  );
}
