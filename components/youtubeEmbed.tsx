import React from "react";

const YoutubeEmbed = () => {
  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/FHhZ-e77xHw?si=iaJEVj9YABbnkKlA"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
