import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useUser from "../hooks/user";

const Header = ({ children }) => {
  const [searchBar, setSearchBar] = useState(false);
  const user = useUser();
  const history = useHistory();
  return (
    <div className="header">
      <div className="first-line">
        <div className="side left">
          <span>
            <Link to="/">WELCOME TO SHOP</Link>
          </span>
          {user.isLogin ? (
            <span
              onClick={(e) => {
                e.preventDefault();
                user.actions.logout();
                history.push("/");
              }}
            >
              LOG OUT
            </span>
          ) : (
            <span>
              <Link to="/signin/">SIGN IN</Link>
            </span>
          )}
        </div>
        <div className="side right">
          <span title="CART">
            <Link to="/cart/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Link>
          </span>
          <div
            className="search-bar slide-in"
            style={{ display: searchBar ? "block" : "none" }}
          >
            <input type="text" placeholder="Search for Items" />
          </div>
          <span
            onClick={() => {
              if (searchBar) {
                setSearchBar(false);
              } else {
                setSearchBar(true);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>{" "}
            SEARCH
          </span>
        </div>
      </div>
      <div className="site-nav">{children}</div>
    </div>
  );
};

export default Header;
