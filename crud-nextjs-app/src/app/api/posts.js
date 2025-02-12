import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => (await axios.get(API_URL)).data;
export const createPost = async (newPost) =>
  (await axios.post(API_URL, newPost)).data;
export const updatePost = async (id, updatedPost) =>
  (await axios.put(`${API_URL}/${id}`, updatedPost)).data;
export const deletePost = async (id) => await axios.delete(`${API_URL}/${id}`);
