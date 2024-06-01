import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to Travelog, your number one source for all things
          travel-related. We are dedicated to giving you the very best of travel
          experiences, with a focus on reliability, customer service, and
          uniqueness.
        </p>
        <p>
          {/* Founded by Hassaan Mehmood and Hussain Iqbal Ranjha, Travelog has come
          a long way from its beginnings. When Hassaan and Hussain first started
          out, their passion for travel and technology drove them to quit their
          day jobs, and turn hard work and inspiration into a booming online
          experience. We now serve customers all over the world, and are
          thrilled to be a part of the travel industry. */}
        </p>
        <p>
          Our mission is to provide an easy-to-use platform that helps travelers
          share their experiences, find inspiration, and plan their next
          adventure. We hope you enjoy our platform as much as we enjoy offering
          it to you. If you have any questions or comments, please don't
          hesitate to contact us.
        </p>
        <h3>Project Details</h3>
        <p>
          This entire project was created by Hassaan Mehmood and Hussain Iqbal
          Ranjha. It took 15 days of hard work and dedication to build a fully
          functional Travelog website. We put in countless hours to ensure that
          every aspect of the website is perfect and provides the best user
          experience possible.
        </p>
        <p>Thank you for visiting Travelog. Happy travels!</p>
      </div>
    </div>
  );
};

export default About;
