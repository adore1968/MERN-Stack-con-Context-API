import { Outlet } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-900 flex items-center justify-center min-h-screen mx-auto">
      <div className="container px-10 m-auto text-white">
        <PostProvider>
          <Outlet />
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
