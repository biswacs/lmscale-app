import LandingPage from "./components/Landing/LandingPage";

const page = () => {
  return (
    <div
      className="scroll-smooth"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      <LandingPage />
    </div>
  );
};

export default page;
