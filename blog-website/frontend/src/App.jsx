import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import LoginSignup from "./pages/LoginSignup";
import EditBlog from "./components/EditBlog"; // Make sure this file exists and is correct

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar only if logged in */}
        {user && <Navbar />}
        <div className="content">
          <Routes>
            {!user ? (
              <>
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginSignup setUser={setUser} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
