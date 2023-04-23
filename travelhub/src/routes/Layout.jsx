import { Outlet, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul className="navbar-container">
          <li className="logo-link navbar-item" key="logo-button">
            <Link className='logo link-item' to="/">
              <img id='logo-img' src='logo.png'></img>
            </Link>
          </li>

        <div className='right-navbar'>
          <li className="search navbar-item" key="search">
            <SearchBar />
          </li>

          <li className="home-link navbar-item" key="home-button">
            <Link className='link-item' to="/">
              Home
            </Link>
          </li>

          <li className="create-link navbar-item" key="create-button">
            <Link className='link-item' to="/create">
              Create New Post
            </Link>
          </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
