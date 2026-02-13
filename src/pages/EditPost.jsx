import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Edit Post</h2>

        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPost;
