import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostContext";
import { VscEmptyWindow } from "react-icons/vsc";

export function HomePage() {
  const { isLoading, posts } = usePosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <VscEmptyWindow className="w-48 h-48" />
        <h1 className="text-2xl">There are no posts</h1>
        <Link
          to="/new"
          className="hover:bg-indigo-600 px-3 py-2 mt-4 text-white bg-indigo-500"
        >
          New Post
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold text-gray-300">
          Posts {posts.length}
        </h1>
        <Link
          to="/new"
          className="hover:bg-indigo-600 px-3 py-2 text-white bg-indigo-500"
        >
          New Post
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
