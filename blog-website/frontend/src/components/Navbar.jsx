import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BlogService from '../services/blogs'

const Navbar = ({user,setUser}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        BlogService.setToken(null)
        setUser(null)
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div style={{display:"flex",flexDirection:"column"}}>
                <h1>The Dojo Blog</h1>
                {user && (
                <div className="user-info"  style={{display:"flex", gap:"2px", fontSize:"20px", paddingLeft:"5px"}}>
                    <strong><span style={{color:"#f1356d"}}>Logged in as {user.username}</span></strong>
                    <button className="logout-btn" onClick={handleLogout}  style={{color: "white", backgroundColor: '#f1356d',borderRadius: '8px', border:"none"}}>Logout</button>
                </div>
                )}
            </div>
            <div className="links">
                <Link to="/" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Home </Link>
                <Link to="/create" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>New Blog</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;