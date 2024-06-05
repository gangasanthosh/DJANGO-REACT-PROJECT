import React from "react";
import Img1 from "../assets/images/MNCs/image1.png";
import Img2 from "../assets/images/MNCs/image2.png";
import Img3 from "../assets/images/MNCs/image3.png";
import Img4 from "../assets/images/MNCs/image4.png";
import Img5 from "../assets/images/MNCs/image5.png";

const Companies = () => {
  return (
    <div className="grid grid-cols-5 opacity-65 my-20">
      <img src={Img1} draggable="false" />
      <img src={Img2} draggable="false" />
      <img src={Img3} draggable="false" />
      <img src={Img4} draggable="false" />
      <img src={Img5} draggable="false" />
    </div>
  );
};

export default Companies;
