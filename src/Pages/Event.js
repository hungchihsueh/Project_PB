import React from "react";
import "../css/Event.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventBanner from "../components/Event/EventBanner";
import EventCard from "../components/Event/EventCard";
import { useEffect } from "react";
function Event() {
  useEffect(()=>{
    window.scroll({
      top:0,
      behavior:"instant"
    });
    
  },[])
  return (
    <div>
      <Navbar />
      <nav>
        <EventBanner />
      </nav>
      <main>
        <EventCard />
      </main>
      <Footer />
    </div>
  );
}

export default Event;
