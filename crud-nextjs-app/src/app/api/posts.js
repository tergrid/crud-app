import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data.slice(0, 10);
};

export const createPost = async (newPost) =>
  (await axios.post(API_URL, newPost)).data;

export const updatePost = async (id, updatedPost) => {
  if (typeof id === "string" && id.includes("-")) {
    return { id, ...updatedPost };
  }
  return (await axios.put(`${API_URL}/${id}`, { id, ...updatedPost })).data;
};

export const deletePost = async (id) => await axios.delete(`${API_URL}/${id}`);
