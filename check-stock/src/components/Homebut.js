import { Link } from "react-router-dom";

const Homebut = ({ namebut, img, url }) => {
  return (
    <Link to={url}>
      <div className="divicon ">
        <h3>{namebut}</h3>
        <div
          className="d-flex justify-content-center align-items-center h-100 w-100">
          <img className="icon1" src={img} />
        </div>
      </div>
    </Link>
  );
};

export default Homebut;
