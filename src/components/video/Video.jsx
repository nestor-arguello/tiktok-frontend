import React, { useRef, useState, forwardRef } from 'react';

import './Video.css';
import VideoFooter from './VideoFooter';
import VideoSidebar from './VideoSidebar';
import LoadingVideo from '../loading-video';

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
      fetchingData,
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
        <LoadingVideo loading={loadingVideo || fetchingData} />
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
