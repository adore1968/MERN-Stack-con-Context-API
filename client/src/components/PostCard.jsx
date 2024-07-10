import { toast } from "react-hot-toast";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = () => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete?</p>
          <div>
            <button
              type="button"
              className="hover:bg-red-500 px-3 py-2 mx-2 text-sm text-white bg-red-400 rounded-sm"
              onClick={async () => {
                await deletePost(post._id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 mx-2 text-white rounded-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 shadow-black hover:bg-zinc-700 hover:cursor-pointer text-white rounded-sm shadow-md"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="py-7 px-4">
        <div className="flex items-center justify-between">
          <h3>{post.title}</h3>
          <button
            type="button"
            className="hover:bg-red-500 px-2 py-1 text-sm bg-red-600 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
        <p>{post.description}</p>
      </div>
      {post.image && (
        <img src={post.image.url} className="h-96 object-cover w-full" />
      )}
    </div>
  );
}

export default PostCard;
