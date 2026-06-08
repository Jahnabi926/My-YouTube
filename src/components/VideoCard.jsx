const VideoCard = ({ info }) => {
  console.log(info);
  const { snippet, statistics } = info || {};
  const { channelTitle, title, thumbnails } = snippet || {};

  if (!info) return <div>Loading...</div>;
  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img
        className="rounded-lg"
        src={thumbnails?.medium?.url}
        alt="thumbnail"
      />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics?.viewCount} views</li>
      </ul>
    </div>
  );
};

// HOC -- it takes an existing component videocard and moifies a little
export const AdVideoCard = ({ info }) => {
  return (
    <div className="border border-red-400">
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;
