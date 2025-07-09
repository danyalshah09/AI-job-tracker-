// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import MovingSlider from "./Slider";
import Tools from "./Tools";
import JobTrackerFAQ from "./Faq";
import Info from "./Info"
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Hero/>
    <MovingSlider/>
    <Tools/>
    <Info/>
    <main className="flex-1">{children}</main>
    <JobTrackerFAQ/>
    <Footer />
  </div>
);

export default Layout;