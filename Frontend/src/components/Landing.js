import React from "react";
import landingImg from "../resources/landing.jpg";

function Landing() {
  return (
    <div className="landing1-container" style={{ marginTop: "70px" }}>
      <div style={{display:"flex"}}>
        <div className="text">
          <div className="landing-heading">Proof of Elapsed Time</div>
          <div className="landing-tagLine"> - A Time based consensus algorithm</div>
        </div>
        <div className="landing-img">
          <img src={landingImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
