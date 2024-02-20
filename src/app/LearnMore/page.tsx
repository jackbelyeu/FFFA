'use client'
// import React, { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import Contact from '../LearnMore/Contact';
import Teams from '../LearnMore/Teams';
import Carousel from '../LearnMore/Carousel';

 const Page: React.FC = () => {
  return (
    <div style={{backgroundImage: "url('https://media.istockphoto.com/id/472347896/photo/striped-soccer-field.jpg?s=612x612&w=0&k=20&c=wgeavCCOimF1b5mrv9QNQuuJqs1ERX67pDjPT3yv8j8=')",backgroundSize: 'cover'}}>
      <nav className="navbar justify-content-between" style={{ background: "grey", backgroundImage:"url('https://www.freewebheaders.com/wp-content/gallery/football/cache/world-cup-goal-keeper-sport-website-header.jpg-nggid044198-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg')",backgroundSize:'cover',height:"150px"}}>
        <a className="navbar-brand" style={{ color: "white", fontSize: "calc(12px + 2vw)", fontFamily: "fantasy" }}>
          Express interest for 2024 season
          <Link style={{ color: 'white', textDecoration: 'none' }} href={"https://docs.google.com/forms/d/e/1FAIpQLSdePwew3zR-kj-D512n-0biefdlnWeOPOXVXuOBAEv1y_qmFg/viewform?authuser=0"}> Click Here
            </Link>
        </a>
      </nav>
      <Teams />
      <Contact />
    </div>
  );
}

export default Page;
