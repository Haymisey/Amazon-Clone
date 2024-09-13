import React from "react";
import "./Home.css";
import Product from "../Product/Product";
// import banner from "../assets/18448.jpg";
import banner from "../assets/banner.jpg";
import mixer from "../assets/mixer.jpg";
import aveeno from "../assets/aveeno.jpg";
import gamingSet from "../assets/gamingset.jpg";
import samsung from "../assets/samsung.jpg";
import theOrdinary from "../assets/theOrdinary.jpg";
import mats from "../assets/Mats.jpg";
import lamps from "../assets/lamps.jpg";

export default function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={banner} alt="" />
        <div className="home__row">
          <Product
            id={1}
            title="Smooth Bathroom Mats: Quick-Dry Bathroom Mat with Textured Surface"
            price={29.99}
            image={mats}
            rating={5}
          />
          <Product
            id={2}
            title="Mai
Stand Mixer,Kitchen Electric Mixer with Dough Hook, Wire Whip"
            price={119.93}
            image={mixer}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id={3}
            title="AVEENO
Healing Skin Ointment Advanced Therapy"
            price={119.93}
            image={aveeno}
            rating={5}
          />
          <Product
            id={4}
            title="Ordinary Sets- The Ordinary Hyaluronic Acid 2% + B5 Hydration Booster"
            price={110.86}
            image={theOrdinary}
            rating={4}
          />
          <Product
            id={5}
            title="Industrial Floor Lamp with Glass Shade-LED bulbs"
            image={lamps}
            price={35.63}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id={6}
            title="Samsung: Samsung Smart Monitor M8 with UHD Display"
            image={samsung}
            price={280.35}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}
