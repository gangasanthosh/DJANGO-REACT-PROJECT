const Footer = () => {
  return (
    <div className="mt-40 flex flex-wrap justify-between w-full py-10 text-left">
      <div className="left w-full md:w-auto mb-10 md:mb-0">
        <h3 className="text-3xl font-bold mb-3">JobStack</h3>
        <h5>
          Where you build your <span className="font-bold" style={{ color: '#8436a8' }}>dream career</span>!
        </h5>
      </div>
      <div className="right grid grid-cols-1 md:grid-cols-3 gap-20 w-full md:w-auto">
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">Community</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><u>Twitter</u></a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><u>Facebook</u></a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer"><u>GitHub</u></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><u>Instagram</u></a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">About Us</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="/aboutus"  rel="noopener noreferrer"><u>About Us</u></a></li>
            <li><a href="/searchcompany"  rel="noopener noreferrer"><u>Find Companies</u></a></li>
            <li><a href="/searchjob" rel="noopener noreferrer"><u>Find Jobs</u></a></li>
            <li><a href="/contactus" rel="noopener noreferrer"><u>Contact Us</u></a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3 className="text-xl font-bold mb-5">Contact</h3>
          <address>
            <p>JobStack pvt ltd.</p>
            <p>2093 Philadelphia Pike,</p>
            <p>#5678, Claymont,</p>
            <p>Delaware 19703</p>
            <p>United States Of America</p>
          </address>
          <p className="mt-5">© JobStack</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
