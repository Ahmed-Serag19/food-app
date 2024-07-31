import AuthLogo from "../AuthLogo/AuthLogo";
import "./NotFound.css";
import ErrorRobot from "../../../../assets/images/error-404.png";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-404 vh-100">
      <div className="container">
        <header>
          <div className="logo-container w-50">
            <AuthLogo />
          </div>
        </header>
        <main className="d-flex align-items-center">
          <div className="text-container">
            <h2 className="">Oops</h2>
            <h4 className="text-success">Page not found</h4>
            <p>
              This page dosent exist or was removed! <br />
              We suggest you back to home
            </p>
            <Link to="/dashboard">
              <button>
                <FaArrowLeft />
                Back to
                <br />
                home
              </button>
            </Link>
          </div>
          <div className="error-img-container position-absolute bottom-0">
            <img src={ErrorRobot} alt="error 404 robot" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
