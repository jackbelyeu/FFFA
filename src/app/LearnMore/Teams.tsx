import Link from "next/link";
// import React from "react";

export default function Teams() {
  return (
    <div style={{ margin: "20px"}}>
    <div className="container">
      {/* First Row */}
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-hyenas.jpeg"} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-chickens.jpeg"} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-emus.jpeg"} alt="" />
            </div>
          </div>
        </div>
      </div>
  
      {/* Second Row */}
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-mockingbirds.jpeg"} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-fffa.jpeg"} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-grasskickers.jpeg"} alt="" />
            </div>
          </div>
        </div>
      </div>
  
      {/* Third Row */}
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={"logo-mosquitoes.jpeg"} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              {/* Add your content here */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body p-0">
              {/* Add your content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
