import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";

const useYouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Initial Load Effect
  useEffect(() => {
    const getInitialVideos = async () => {
      setLoading(true);
      try {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideos(json.items || []);
        setNextToken(json.nextPageToken || "");
      } catch (error) {
        console.error("Error fetching initial YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialVideos();
  }, []); // Runs exactly once on page load

  // 2. Continuous Scroll Fetching Function
  const fetchMoreVideos = async () => {
    if (loading || !nextToken) return;
    setLoading(true);

    try {
      const url = `${YOUTUBE_VIDEOS_API}&pageToken=${nextToken}`;
      const data = await fetch(url);
      const json = await data.json();

      setVideos((prevVideos) => [...prevVideos, ...(json.items || [])]);
      setNextToken(json.nextPageToken || "");
    } catch (error) {
      console.error("Error fetching more YouTube videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Page Scroll Monitoring Effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 150 &&
        !loading &&
        nextToken
      ) {
        fetchMoreVideos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, nextToken]);

  return { videos, loading };
};

export default useYouTubeVideos;
