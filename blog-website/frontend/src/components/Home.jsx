import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import blogServices from "../services/blogs";


const Home = ({user}) => {
  const [blogs,setBlogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const loadedBlogs = await blogServices.getAll()
        const allBlogs = loadedBlogs.data
        setBlogs(allBlogs.filter(blog => blog.user == user.id))
      }
    }
    fetchData()
  },[user])


  return (
    <div className="home">
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};


export default Home;