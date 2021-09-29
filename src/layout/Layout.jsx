import { Link } from "react-router-dom";

import "./Layout.scss";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "../components/Loading";
import useCollections from "../hooks/useCollections";

const Nav = () => {
  const collections = useCollections();

  return (
    <>
      {collections.hasLoaded ? (
        <div className="nav">
          {collections.state.reverse().map((collection, i) => (
            <div key={i}>
              <Link to={`/collection/${collection.id}/`}>
                {collection.name}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header>
        <Nav />
      </Header>
      <div className="main">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
