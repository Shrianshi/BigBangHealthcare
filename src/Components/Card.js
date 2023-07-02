import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./style.css";

const Card = (props) => {
  const { value, image } = props;

  return (
    <div>
      <div
        className="card card-image"
        style={{
          width: "35rem",
          height: "25rem",
          backgroundImage: `url(${image})`,
        }}
      >
      </div>
    </div>
  );
};
export default Card;
