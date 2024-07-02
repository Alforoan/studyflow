import axios from "axios";
import React, { useState, useEffect } from "react";

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState({ title: "", logo: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/metadata`,
          {
            params: { url },
          }
        );

        setMetadata({
          title: response.data.title,
          logo: response.data.favicon,
        });
        setLoading(false);
      } catch (err) {
        if (err) {
          setMetadata({ title: url, logo: "" });
        }
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  //   if (url.includes("youtube.com") || url.includes("youtu.be")) {
  //     return (
  //       <div className="link-preview flex items-center">
  //         <iframe
  //           width="300"
  //           height="200"
  //           src={`https://www.youtube.com/embed/${getYouTubeID(url)}`}
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowFullScreen
  //           title="YouTube video"
  //         ></iframe>
  //       </div>
  //     );
  //   }
  return (
    <div className="link-preview flex items-center p-2 rounded-md">
      {loading ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      ) : (
        <>
          {metadata.logo && (
            <img
              src={metadata.logo}
              alt="alt"
              className="w-6 h-6 mr-2 rounded-md"
            />
          )}
          <p className="text-blue-500 hover:underline">{metadata.title}</p>
        </>
      )}
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
