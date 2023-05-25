import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let history = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/'? "active":""} `} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about'? "active":""} `} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!(localStorage.getItem('token'))?<form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button"> Login </Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button"> Signup </Link>
          </form>:<button className="btn btn-primary mx-2" onClick={handleLogout}> Logout </button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
