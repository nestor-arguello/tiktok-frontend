import React, { useRef, useState, forwardRef } from 'react';

import './Video.css';
import VideoFooter from '../video-footer/VideoFooter';
import VideoSidebar from '../video-sidebar/VideoSidebar';
import LoadingVideo from './LoadingVideo';

const Video = forwardRef(
  (
    {
      url,
      description,
      channel,
      song,
      likes,
      shares,
      messages,
      onVideoLoaded,
      loadingVideo,
    },
    ref
  ) => {
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
      <div ref={ref} className="video">
        <LoadingVideo loading={loadingVideo} />
        <video
          className="video__player"
          src={url}
          loop
          ref={videoRef}
          onClick={handleVideoPress}
          onLoadedData={onVideoLoaded}
        />
        <VideoFooter channel={channel} description={description} song={song} />
        <VideoSidebar likes={likes} messages={messages} shares={shares} />
      </div>
    );
  }
);

export default Video;
