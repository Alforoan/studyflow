import React, { useState, useEffect } from "react";

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState({ title: "", logo: "" });

  useEffect(() => {
    fetch(`https://api.microlink.io/?url=${url}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMetadata({
            title: data.data.title,
            logo: data.data.logo.url,
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [url]);

  //   if (url.includes("youtube.com") || url.includes("youtu.be")) {
  //     return (
  //       <div className="link-preview flex items-center">
  //         <iframe
  //           width="300"
  //           height="200"
  //           src={`https://www.youtube.com/embed/${getYouTubeID(url)}`}
  //           frameBorder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowFullScreen
  //           title="YouTube video"
  //         ></iframe>
  //       </div>
  //     );
  //   }
  return (
    <div className="link-preview flex items-center p-2 rounded-md">
      {metadata.logo && (
        <img
          src={metadata.logo}
          alt="alt"
          className="w-6 h-6 mr-2 rounded-md"
        />
      )}
      <p className="text-blue-500 hover:underline">{metadata.title}</p>
    </div>
  );
};

const getYouTubeID = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default LinkPreview;
