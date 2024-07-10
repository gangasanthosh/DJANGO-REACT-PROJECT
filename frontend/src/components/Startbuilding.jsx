import HeroImg from "../assets/images/hero.png";

const Startbuilding = () => {
  return (
    <div className="container flex mt-6">
      <div className="left w-1/2 text-left pt-9">
        <h1 className="text-[4rem] mt-3 leading-none font-bold">
        Start Building Your <span className="underline font-bold" style={{ color: '#8436a8' }}>Dream Career</span>{" "}
          with
        </h1>
        <h1 className="text-[4rem] mt-3 leading-none font-bold">JobStack</h1>
        <p className="mt-9 py-5 w-[80%]">
        Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.
        </p>
        <div className="mt-9 border rounded-full bg-zinc-50 w-[75%] flex justify-between align-middle">
          <input type="text" className="bg-transparent w-4/5 outline-none border-none px-6" placeholder="Search job..." />
          <button className="rounded-full px-5 py-2 text-black font-bold" style={{ backgroundColor: '8436a8' }}>
            Search
          </button>
        </div>
      </div>
      <div className="right w-1/2">
        <img src={HeroImg} alt="" />
      </div>
    </div>
  );
};

export default Startbuilding;


