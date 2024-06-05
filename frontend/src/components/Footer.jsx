const Footer = () => {
  return (
    <div className="mt-40 flex justify-between w-full py-10 text-left">
      <div className="left ">
        <h3 className="text-3xl font-bold mb-3">JobStack</h3>
        <h5>Where you build your <span className="font-bold" style={{ color: '#8436a8' }}>dream career</span>!</h5>
      </div>
      <div className="right grid grid-cols-3 gap-20">
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">Community</h3>
          <ul className="flex flex-col gap-3">
            <li>Twitter</li>
            <li>Facebook</li>
            <li>GitHUB</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">Community</h3>
          <ul className="flex flex-col gap-3">
            <li>Twitter</li>
            <li>Facebook</li>
            <li>GitHUB</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">Community</h3>
          <ul className="flex flex-col gap-3">
            <li>Twitter</li>
            <li>Facebook</li>
            <li>GitHUB</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
