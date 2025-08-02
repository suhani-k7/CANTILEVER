import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogServices from "../services/blogs";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    blogServices.getOne(id).then((response) => {
      const blog = response.data;
      setTitle(blog.title);
      setBody(blog.body);
      setAuthor(blog.author);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };

    setIsPending(true);

    blogServices.updateBlog(id, updatedBlog)
      .then(() => {
        setIsPending(false);
        navigate(`/blogs/${id}`);
      });
  };

  return (
    <div className="create">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        {!isPending && <button>Update Blog</button>}
        {isPending && <button disabled>Updating blog...</button>}
      </form>
    </div>
  );
};

export default EditBlog;
