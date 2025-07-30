import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import blogServices from "../services/blogs";


const Home = () => {
  const [blogs,setBlogs] = useState([])
  const initiateBlogs = () => {
    blogServices
                  .getAll()
                  .then(response => {
                    setBlogs(response.data)
                  })
                 
  }


  useEffect(initiateBlogs,[])


  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};


export default Home;
