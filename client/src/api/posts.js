import axios from "./axios";

export const getPostsRequest = async () => {
  return await axios("/");
};

export const getPostRequest = async (id) => {
  return await axios(`/${id}`);
};

export const createPostRequest = async (values) => {
  const form = new FormData();
  for (let key in values) {
    form.append(key, values[key]);
  }
  return await axios.post("/", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostRequest = async (id) => {
  return await axios.delete(`/${id}`);
};

export const updatePostRequest = async (id, values) => {
  return await axios.put(`/${id}`, values);
};
