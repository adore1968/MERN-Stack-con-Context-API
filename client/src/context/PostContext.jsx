import { createContext, useContext, useEffect, useState } from "react";
import {
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  getPostsRequest,
  updatePostRequest,
} from "../api/posts";

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  return context;
};

export function PostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await getPostsRequest();
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const createPost = async (values) => {
    try {
      const response = await createPostRequest(values);
      if (response.status === 201) {
        setPosts([...posts, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const response = await getPostRequest(id);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, values) => {
    try {
      const response = await updatePostRequest(id, values);
      if (response.status === 200) {
        setPosts(posts.map((p) => (p._id === id ? response.data : p)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await deletePostRequest(id);
      if (response.status === 204) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ isLoading, posts, createPost, getPost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
}
