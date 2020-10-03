import React from 'react';

import './LoadingVideo.css';

import Spinner from './Spinner';

const LoadingVideo = ({ loading }) => {
  const loadingClass = loading ? 'show' : '';

  return (
    <div className={`loading-video ${loadingClass}`}>
      <Spinner />
    </div>
  );
};

export default LoadingVideo;
