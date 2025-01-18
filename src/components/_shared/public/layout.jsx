import React from "react";
import Header from "./Header";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
