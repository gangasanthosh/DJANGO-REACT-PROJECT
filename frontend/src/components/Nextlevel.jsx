import Bullet from '../assets/images/bullet.png';
import Img1 from "../assets/images/image1.png";
import Img2 from "../assets/images/image2.png";

const Nextlevel = () => {
  return (
    <div className="w-full py-5 mt-32 flex justify-between items-start text-left">
      <div className="basis-[40%]">
        <h2 className="text-6xl font-bold">
          Millions of jobs.
          Find the one that's right for you.
        </h2>
        <p className="mt-5">
          Search all the open positions on the web. Get your own personalized salary estimate.
        </p>
        <div className="flex justify-between w-full mt-6">
          <img src={Img1} alt="image" className="w-[45%] rounded-xl" />
          <img src={Img2} alt="image" className="w-[45%] rounded-xl" />
        </div>
      </div>
      <div className="basis-[50%] flex flex-col gap-7 items-start pt-3">
        <div className="custom-list-items flex items-center gap-3">
          <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
          <div className="text-container">
            <h2 className="text-2xl font-bold"><u><a href='searchcompany/'>Search for Companies</a></u></h2>
          </div>
        </div>
        <div className="custom-list-items flex items-center gap-3">
          <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
          <div className="text-container">
            <h2 className="text-2xl font-bold"><u><a href='searchjob/'>Search for Jobs</a></u></h2>
          </div>
        </div>
        <div className="custom-list-items flex items-center gap-3">
          <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
          <div className="text-container">
            <h2 className="text-2xl font-bold"><a href='status/'><u>View your Application status</u></a></h2>
          </div>
        </div>
        <div className="custom-list-items flex items-center gap-3">
          <img src={Bullet} alt="bullet" className="w-[3.5rem] h-[3.5rem] rounded-lg"/>
          <div className="text-container">
            <h2 className="text-2xl font-bold"><a href='jsinsight/'><u>View Insights</u></a></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nextlevel;
