import { useNavigate, useParams } from "react-router-dom";
import blogsServices from "../services/blogs";
import { useEffect, useState } from "react";


const BlogDetails = () => {
  const { id } = useParams();
  const [blog,setBlog] = useState([])
    const initiateBlogs = () => {
      blogsServices
                    .getOne(id)
                    .then(response => {
                      setBlog(response.data)
                      console.log(response)
                    })
                   
    }
 
    useEffect(initiateBlogs,[id])
  const history=useNavigate();
 
  const handleClick=()=>{
    blogsServices
    .deleteBlog(id)
    .then(()=> {
      history('/',{replace:false});
    })
  }


  return (
    <div className="blog-details">
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
}
export default BlogDetails;
