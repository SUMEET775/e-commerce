
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const{user,logOut}= useAuth()
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>
     
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/checkout" className="navbar-link">
          Cart
        </Link>
      </div>
      <div className="navbar-auth">
       { !user ?<div className="navbar-auth-links">
          <Link to="/auth" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/auth" className="btn btn-primary">Sign up</Link>
        </div> :(<div className="navbar-user"><span className="navbar-greeting">hello,{user.email}</span>
        <button className="btn btn-secondary" onClick={logOut}>
          Logout
        </button>
        
         </div>)}
      </div>
       </div>
    </nav>
  );
};

export default Navbar;
