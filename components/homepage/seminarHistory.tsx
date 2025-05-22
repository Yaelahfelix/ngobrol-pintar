"use client";

import React from "react";

import CircularGallery from "../CircularGallery/CircularGallery";

const HomepageSeminarHistory = () => {
  return (
    <div className="layout">
      <div style={{ height: "400px", position: "relative" }}>
        <CircularGallery
          items={[
            {
              image: "https://picsum.photos/200/300",
              text: "Seminar Kita",
            },
            {
              image: "https://picsum.photos/400/500",
              text: "Saham",
            },
            {
              image: "https://picsum.photos/300/400",
              text: "Workshop AI",
            },
          ]}
          bend={3}
          textColor="black"
          borderRadius={0.05}
        />
      </div>
    </div>
  );
};

export default HomepageSeminarHistory;
