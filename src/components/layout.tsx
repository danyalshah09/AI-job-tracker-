// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import MovingSlider from "./Slider";
import Tools from "./Tools";
import JobTrackerFAQ from "./Faq";
import Info from "./Info"
const Layout = ({ children, setShowAuth, setAuthTab }: { children: React.ReactNode, setShowAuth: (show: boolean) => void, setAuthTab: (tab: string) => void }) => (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <Header setShowAuth={setShowAuth} setAuthTab={setAuthTab} />
    <main className="flex-1">{children}</main>

    <Footer />
  </div>
);

export default Layout;