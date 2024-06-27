import React from 'react';
import './AboutUs.css'; // Assuming you have a CSS file for styling

const Navbar = () => (
  <nav className="container">
    {/* Your navbar content */}
  </nav>
);

const AboutUs = () => {
  return (
    <section className="about-us container">
      <div className='everything-except-box'>
      <div className="about-us__intro">
        <h1>Welcome to JobStack!</h1>
        <p>
          At JobStack, we believe in the power of the right job fit to transform lives and businesses. Our mission is to connect talented professionals with top employers, helping both candidates and companies achieve their goals.
        </p>
      </div>

      <div className="about-us__who-we-are">
        <h2>Who We Are</h2>
        <p>
          Founded in 1999, JobStack is a dedicated team of career experts, technology enthusiasts, and customer service professionals. We understand the challenges of job searching and recruitment, and we strive to simplify the process for everyone involved.
        </p>
      </div>

      <div className="about-us__what-we-do">
        <h2>What We Do</h2>
        <p>
          Our platform offers a seamless experience for job seekers and employers. Whether you are a fresh graduate looking for your first job, a seasoned professional seeking new opportunities, or a company aiming to hire the best talent, JobStack is here to assist you.
        </p>
        <ul>
          <li>For Job Seekers</li>
          <ul>
            <li>Personalized Job Recommendations: Get job matches tailored to your skills and preferences.</li>
            <li>Career Resources: Access articles, resume tips, and interview guides to enhance your job search.</li>
            <li>Easy Application Process: Apply for jobs with just a few clicks, track your applications, and receive timely updates.</li>
          </ul>
          <li>For Employers</li>
          <ul>
            <li>Extensive Talent Pool: Reach a diverse range of qualified candidates across various industries.</li>
            <li>Advanced Search Tools: Utilize our powerful search and filtering tools to find the perfect match.</li>
            <li>Efficient Hiring Process: Streamline your recruitment with our user-friendly platform and dedicated support.</li>
          </ul>
        </ul>
      </div>

      <div className="about-us__vision">
        <h2>Our Vision</h2>
        <p>
          We envision a world where every individual has the opportunity to find a fulfilling career, and every business can build a thriving team. By leveraging cutting-edge technology and industry expertise, we aim to create a job portal that not only meets but exceeds the expectations of our users.
        </p>
      </div>

      <div className="about-us__why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>User-Centric Approach: We prioritize the needs of our users, offering intuitive features and exceptional customer support.</li>
          <li>Innovation and Integrity: We continuously innovate while maintaining transparency and trustworthiness in all our interactions.</li>
          <li>Community and Collaboration: We foster a community where job seekers and employers can connect, collaborate, and grow together.</li>
        </ul>
      </div>
      </div>
      <div className="about-us__call-to-action">
        <h5>Join us on this journey to revolutionize the job market. Explore JobStack today and take the next step towards a brighter future.</h5>
      </div>
    </section>
  );
};

export default AboutUs;
