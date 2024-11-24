import React from "react";
import Header from "./components/Landing/Header";
import Hero from "./components/Landing/Hero";
import Details from "./components/Landing/Details";
import Architecture from "./components/Landing/Architecture";
import Applications from "./components/Landing/Applications";
import Contact from "./components/Landing/Contact";
import Footer from "./components/Landing/Footer";
import Models from "./components/Landing/Models";

const page = () => {
  return (
    <div
      className="scroll-smooth"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
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

export default page;
