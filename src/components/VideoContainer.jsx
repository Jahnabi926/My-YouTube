import { useEffect, useState } from "react";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import { Link } from "react-router";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      // window.myVideos = json.items;
      setVideos(json.items);
    };

    getVideos();
  }, []);

  return (
    <div className="flex flex-wrap">
      {videos && <AdVideoCard info={videos[0]} />}
      {videos?.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
