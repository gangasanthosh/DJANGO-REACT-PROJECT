import Bullet from '../assets/images/bullet.png';
import Img1 from "../assets/images/image1.png";
import Img2 from "../assets/images/image2.png";

const Nextlevel = () => {
  return (
    <div className="w-full py-5 mt-32 flex justify-between text-left">
      <div className=" basis-[40%]">
        <h2 className="text-6xl font-bold">
        Millions of People.
        Find the one that's right for you.
        </h2>
        <p className="mt-5">
        People are not Important Asset, the right People are.
        </p>
        <div className="flex justify-between w-full mt-6">
          <img src={Img1} alt="image" className="w-[45%] rounded-xl" />
          <img src={Img2} alt="image" className="w-[45%] rounded-xl" />
        </div>
      </div>
      <div className="basis-[50%] flex flex-col items-center gap-7 pt-3">
        <div className="custom-list-items flex gap-3 items-center">
        <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
        <div className="text-container">
          <h2 className="text-2xl font-bold">blah blah blah</h2>
          <p>Carpe Diem</p>
        </div>
        </div>
        <div className="custom-list-items flex gap-3 items-center">
        <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
        <div className="text-container">
          <h2 className="text-2xl font-bold">blah blah blah</h2>
          <p>cARPE dIEM</p>
        </div>
        </div>
        <div className="custom-list-items flex gap-3 items-center">
        <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
        <div className="text-container">
          <h2 className="text-2xl font-bold">blah blah blah</h2>
          <p>CARPE DIEM</p>
        </div>
        </div>
        <div className="custom-list-items flex gap-3 items-center">
        <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
        <div className="text-container">
          <h2 className="text-2xl font-bold">blah blah blah</h2>
          <p>cArPe DiEm</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Nextlevel;
