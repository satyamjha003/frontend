import { useContext ,useEffect,useState} from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
          const res = await api.get("/posts");
    setPosts(res.data);
    } catch (error) {
      console.log("Failed to fetch posts",error)
    }

  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts(); // refresh list
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">
            <Link
              to={`/post/${post._id}`}
              className="text-xl font-bold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p>{post.content}</p>

            <p className="text-sm text-gray-500 mt-2">
              By {post.author.username}
            </p>

            {/* AUTHOR ACTIONS */}
            {user && user._id === post.author._id && (
              <div className="flex gap-2 mt-3">
                <Link
                  to={`/edit-post/${post._id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;