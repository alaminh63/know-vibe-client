import React, { useState, useEffect } from "react";

const Youtube = () => {
  const api = "AIzaSyAOCE16DsvDV5gUJqSPGNHf56aSdjHSpgw"; // Replace with your YouTube API key
  const playlistId = "PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl"; // Replace with your specific playlist ID

  const fetchURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=100`;

  const [allVideos, setAllVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        const videos = data.items.map((item) => ({
          videoId: item.contentDetails.videoId,
          videoTitle: item.snippet.title,
          videoLink: `https://www.youtube.com/embed/${item.contentDetails.videoId}`,
        }));
        setAllVideos(videos);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, [fetchURL]);

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">Video Titles</h2>
        <div>
          {allVideos.map((video , i) => (
            <p
              key={video.videoId}
              className={`cursor-pointer ${
                selectedVideo === video.videoId ? "font-bold" : ""
              }`}
              onClick={() => handleVideoClick(video.videoId)}
            >
                {i + 1}
              {video.videoTitle}
            </p>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4">
        {selectedVideo && (
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube Video"
            
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Youtube;
