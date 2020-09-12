import React, { useRef, useState } from 'react';

import './Video.css';
import VideoFooter from '../video-footer/VideoFooter';
import VideoSidebar from '../video-sidebar/VideoSidebar';

const Video = ({
  url,
  description,
  channel,
  song,
  likes,
  shares,
  messages,
}) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video">
      <video
        className="video__player"
        src={url}
        loop
        ref={videoRef}
        onClick={handleVideoPress}
      ></video>
      <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} messages={messages} shares={shares} />
    </div>
  );
};

export default Video;
