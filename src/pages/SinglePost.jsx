import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function SinglePost() {
  const { id } = useParams();   // get post id from URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">
          By {post.author.username}
        </p>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default SinglePost;
