import { useQuery, useQueryClient } from "@tanstack/react-query";
import { React, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getPosts, deletePost } from "../api/posts";

export default function PostList() {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState(null);
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      {posts.slice(0, 10).map((post) => (
        <div key={post.id} className="card bg-white shadow-lg p-4 mt-2">
          {editingPost?.id === post.id ? (
            <EditPostForm post={post} onCancel={() => setEditingPost(null)} />
          ) : (
            <>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.body}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(post.id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
