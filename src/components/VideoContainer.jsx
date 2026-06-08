import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router";
import useYouTubeVideos from "../hooks/useYouTubeVideos";

const VideoContainer = () => {
  const { videos, loading } = useYouTubeVideos();

  return (
    <div className="flex flex-wrap">
      {/* Show the ad card safely only if videos actually exist */}
      {videos.length > 0 && <AdVideoCard info={videos[0]} />}

      {/* Map through all combined videos */}
      {videos?.map((video, index) => (
        // Adding the index to the key prevents duplicate item key errors from YouTube
        <Link to={"/watch?v=" + video.id} key={`${video.id}-${index}`}>
          <VideoCard info={video} />
        </Link>
      ))}

      {/* Loading message banner at the bottom */}
      {loading && (
        <div className="w-full text-center p-4 font-bold text-gray-500">
          Loading videos...
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
