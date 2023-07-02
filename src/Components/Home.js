import { Nav } from "./Nav";
import Card from "./Card";
import { Data1 } from "../constants/Data1";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./style.css"; 

export const Home = () => {
  
  return (
      
        <div className="container1 container-fluid text-center">
        <Nav></Nav>
          <div className="row">
            {Data1.map((m) => (
              <div className="col" key={m.title}>
                <h1 className="text-white">{m.title}</h1>
                <Link to={`/${m.title.toLowerCase()}`}>
                  <div className="align">
                  <Card value={m.title} image={m.image} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
      <Footer></Footer>
    </div>
  );
};
