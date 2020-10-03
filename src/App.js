import React, { useCallback, useRef, useState } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import useFetchPosts from './hooks/useFetchPosts';
import useLastPostObserver from './hooks/useLastPostObserver';

import './App.css';

import Videos from './components/videos';

const Error = () => (
  <p className="app__error">
    Something went wrong. Please try to refresh the page.
  </p>
);

/**
 * TODO:
 * #1  last post animation
 * #2  center tik tak name
 */

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allVideosLoaded, setAllVideosLoaded] = useState([]);

  const { posts, loading, hasMore, error } = useFetchPosts(currentPage);
  const { lastPostElementRef, scrollAreaRef } = useLastPostObserver({
    loading,
    hasMore,
    posts,
    allVideosLoaded,
    setCurrentPage,
  });

  const handleVideoLoaded = () => {
    console.log('video loaded!');
    setAllVideosLoaded(prevLoaded => [...prevLoaded, true]);
  };

  const videoClass = loading ? 'app__videos--loading' : '';
  const thisYear = new Date().getFullYear();

  return (
    <div className="app">
      <div className="app__header">
        <p className="app__name">Tik Tak</p>
        <div className="app__githubLogo">
          <a
            href="https://github.com/nestor-arguello/tiktok-frontend"
            title="Go to repository"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
      <div ref={scrollAreaRef} className={`app__videos ${videoClass}`}>
        {error ? (
          <Error />
        ) : (
          <Videos
            posts={posts}
            handleVideoLoaded={handleVideoLoaded}
            lastPostElementRef={lastPostElementRef}
            allVideosLoaded={allVideosLoaded}
            loading={loading}
          />
        )}
      </div>
      <div className="app__footer">
        <p>
          © {thisYear}, developed with ♥ by{' '}
          <a href="https://nestor-arguello.github.io">Néstor Argüello</a>
        </p>
      </div>
    </div>
  );
}

export default App;
