import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Details from "./components/Details";
import Architecture from "./components/Architecture";
import Applications from "./components/Applications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Models from "./components/Models";

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
