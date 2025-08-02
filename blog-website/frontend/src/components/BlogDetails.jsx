import { useNavigate, useParams } from "react-router-dom";
import blogsServices from "../services/blogs";
import { useEffect, useState } from "react";


const BlogDetails = () => {
  const { id } = useParams();
  const [blog,setBlog] = useState([]);
  const navigate = useNavigate();

    const initiateBlogs = () => {
      blogsServices
                    .getOne(id)
                    .then(response => {
                      setBlog(response.data);
                    });
                   
    };
 
    useEffect(initiateBlogs,[id])
 
  const handleClick=()=>{
    blogsServices
    .deleteBlog(id)
    .then(()=> {
      navigate('/',{replace:false});
    });
  };
  const loggedUser = JSON.parse(localStorage.getItem("loggedBlogUser"));

  return (
    <div className="blog-details">
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>Delete</button>
          {loggedUser?.username === blog.author && (
            <button onClick={() => navigate(`/edit/${blog.id}`)}>Edit</button>
          )}
          </article>
      )}
    </div>
  );
}
export default BlogDetails;
