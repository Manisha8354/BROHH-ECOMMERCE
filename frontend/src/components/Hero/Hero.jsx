import React, { useState } from "react";
import Video1 from "../../assets/pritamvedio.mp4"; // Replace this with your actual video file path

// Array of local videos and their details
const VideoList = [
  {
    id: 1,
    video: Video1, // Video file path
    title: "DISCOVER EXCLUSIVE STYLES FOR MEN & WOMEN",
    description: "Explore our latest collections of men's and women's fashion, designed for style and comfort.",
  },
];

export default function Hero() {
  // Choose which video to display; here we're displaying the first one (Video1).
  const [currentVideo] = useState(VideoList[0]); // You can change the index for a different default video.

  return (
    <div className="relative w-full mx-auto -mt-10"> {/* Negative margin to shift video upwards */}
      {/* Static video display */}
      <div key={currentVideo.id}>
        <video
          className="w-full h-[40rem] md:h-[45rem] lg:h-[50rem] object-cover" // Further decreased height for all screen sizes
          style={{ objectPosition: "center bottom" }} // Aligns video to the bottom
          autoPlay
          loop
          muted
          controls={false} // Set to true if you want video controls like play/pause
        >
          <source src={currentVideo.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay text content with animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white animate-fadeIn">
          <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{currentVideo.title}</h3>
          <p className="text-lg md:text-xl drop-shadow-lg">{currentVideo.description}</p>
        </div>
      </div>
    </div>
  );
}
