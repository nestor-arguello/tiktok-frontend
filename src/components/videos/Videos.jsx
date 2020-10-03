import React from 'react';

import './Videos.css';

import Video from '../video';

const Videos = ({
  posts,
  handleVideoLoaded,
  lastPostElementRef,
  allVideosLoaded,
  ...props
}) => {
  return posts.map(({ _id, ...props }, index) => {
    console.log(allVideosLoaded[index]);
    if (index + 1 === posts.length) {
      return (
        <Video
          key={_id}
          ref={lastPostElementRef}
          onVideoLoaded={handleVideoLoaded}
          loadingVideo={!allVideosLoaded[index]}
          {...props}
        />
      );
    }
    return (
      <Video
        key={_id}
        onVideoLoaded={handleVideoLoaded}
        loadingVideo={!allVideosLoaded[index]}
        {...props}
      />
    );
  });
};

export default Videos;