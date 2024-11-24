import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Details from "./Details";
import Architecture from "./Architecture";
import Applications from "./Applications";
import Contact from "./Contact";
import Footer from "./Footer";
import Models from "./Models";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Applications />
      <Models />
      <Architecture />
      <Details />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
