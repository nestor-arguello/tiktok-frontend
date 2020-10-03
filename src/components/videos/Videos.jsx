import React from 'react';

import Video from '../video';

const Videos = ({
  posts,
  handleVideoLoaded,
  lastPostElementRef,
  allVideosLoaded,
  loading,
  ...props
}) => {
  return posts.map(({ _id, ...props }, index) => {
    if (index + 1 === posts.length) {
      return (
        <Video
          key={_id}
          ref={lastPostElementRef}
          onVideoLoaded={handleVideoLoaded}
          loadingVideo={!allVideosLoaded[index]}
          fetchingData={loading}
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
