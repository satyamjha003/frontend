import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/"); // go back to home after creating post
    } catch (error) {
      console.error(error.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Post</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
