import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.scss";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-screen flex flex-center justify-between p-2 mx-auto">
        <div className="left-side">
          <img src={require("../../assets/image/interview.png")} alt="Pic" />
        </div>
        <div className="flex flex-col justify-center items-center w-9/12">
          <h1 className="text-5xl font-bold">
            The largest community of developers and companies.
          </h1>
          <div className="info-section">
            <div className="info-item">
              <h2 className="text-2xl font-bold">For Companies</h2>
              <p className="w-9/12">
                Use our platform to interview, identify and hire developers
                wherever they are.
              </p>
              <button
                className="btn"
                onClick={(e) => navigate("/owner/signup")}
              >
                Start hiring
              </button>
            </div>
            <div className="info-item">
              <h2 className="text-2xl font-bold">For Developers</h2>
              <p>
                Join the largest developers community to practise coding skills,
                prepare for job interviews and get hired.
              </p>
              <button
                className="btn"
                onClick={(e) => navigate("/candidate/signup")}
              >
                Start Coding
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
