import React from "react";

const About = () => {
  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-6 bg-white/30 rounded-xl shadow-2xl flex flex-col items-center overflow-scroll"
        style={{ maxHeight: "80vh", scrollbarWidth: "none" }}
      >
        <h1 className="text-4xl text-white text-center font-extralight my-10">
          Welcome to JD Airlines ❤
        </h1>
        <p className="text-xl text-slate-800">
          At JD Airlines, we pride ourselves on delivering exceptional travel
          experiences with a commitment to safety, comfort, and efficiency. As a
          premier airline, we strive to connect you to your destinations with
          reliability and convenience. Whether you're traveling for business or
          leisure, our dedicated team ensures every journey is smooth and
          enjoyable.
        </p>
        <h2 className="text-2xl text-slate-900 text-center font-semibold my-3">
          Our Commitment
        </h2>
        <ul>
          <li className="text-xl text-slate-800 my-1">
            <strong>Safety First: </strong>
            Your safety is our top priority. We adhere to rigorous safety
            standards to provide peace of mind during your travels.
          </li>
          <li className="text-xl text-slate-800 my-1">
            <strong>Exceptional Service: </strong>
            From booking to boarding, our friendly staff is dedicated to
            delivering superior service at every step of your journey.
          </li>
          <li className="text-xl text-slate-800 my-1">
            <strong>Global Connectivity: </strong>
            With a comprehensive network of routes, we connect you to
            destinations around the world, making travel seamless and
            convenient.
          </li>
        </ul>
        <h2 className="text-2xl text-slate-900 text-center font-semibold my-3">
          Explore the World with JD Airlines
        </h2>
        <p className="text-xl text-slate-800">
          Experience the difference with JD Airlines and embark on your next
          adventure with confidence. Discover new horizons with us and enjoy the
          journey every step of the way.
        </p>
      </div>
    </div>
  );
};

export default About;
