import React from "react";
import Working from "../components/Working";
import Performance from "../components/Performance";
import Footer from "../components/Footer";
import Header from "../components/Header";

const page = () => {
  return (
    <div>
      <Header />
      <Working />
      <Performance />
      <Footer />
    </div>
  );
};

export default page;
