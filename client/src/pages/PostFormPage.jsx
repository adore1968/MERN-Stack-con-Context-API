import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/PostContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const postInitialState = {
  title: "",
  description: "",
  image: null,
};

export function PostFormPage() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(postInitialState);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const data = await getPost(id);
        setPost(data);
      }
    };
    loadPost();
  }, [id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 shadow-black p-10 shadow-md">
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={async (values, actions) => {
            if (id) {
              await updatePost(id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <header className=" flex items-center justify-between py-4">
                <h3 className="text-xl">New Post</h3>
                <Link
                  to="/"
                  className="hover:text-gray-300 text-sm text-gray-400"
                >
                  Go Back
                </Link>
              </header>
              <label
                htmlFor="title"
                className="block text-sm font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="focus:outline-none w-full px-3 py-2 mb-4 text-white bg-gray-600 rounded"
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-sm text-red-400"
              />
              <label
                htmlFor="description"
                className="block text-sm font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="focus:outline-none w-full px-3 py-2 text-white bg-gray-600 rounded"
                rows={3}
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-sm text-red-400"
              />

              <label
                htmlFor="image"
                className="block text-sm font-bold text-gray-400"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="focus:outline-none w-full px-3 py-2 text-white bg-gray-600 rounded"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <button
                type="submit"
                className="hover:bg-indigo-500 focus:outline-none disabled:bg-indigo-400 px-4 py-2 mt-2 text-white bg-indigo-600 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
