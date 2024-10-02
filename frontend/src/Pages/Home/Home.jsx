import React from "react";
import "./Home.css";
import HomeBanner from "../../Components/HomeBanner/HomeBanner";
import { assets } from "../../assets/assets";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img src={assets.product_banner} alt="" className="cursor" />
              </div>
            </div>
            <div className="col-md-9">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
