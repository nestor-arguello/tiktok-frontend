import React, { useCallback, useEffect, useRef, useState } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import useFetchPosts from './hooks/useFetchPosts';

import './App.css';

import Videos from './components/videos';

const Error = () => (
  <p className="app__error">
    Something went wrong. Please try to refresh the page.
  </p>
);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allVideosLoaded, setAllVideosLoaded] = useState([]);

  const { posts, loading, hasMore, error } = useFetchPosts(currentPage);

  const observer = useRef();
  const scrollAreaRef = useRef();

  const lastPostElementRef = useCallback(
    node => {
      if (loading || allVideosLoaded.length !== posts.length) return;

      if (observer.current) {
        observer.current.disconnect();
      }
      const options = {
        threshold: 1,
        root: scrollAreaRef.current,
      };
      console.log(node);
      observer.current = new IntersectionObserver(entries => {
        console.log(
          'video has fully entered in the root',
          entries[0].isIntersecting
        );
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prevPage => ++prevPage);
        }
      }, options);

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, posts, allVideosLoaded]
  );

  const handleVideoLoaded = () => {
    console.log('video loaded!');
    setAllVideosLoaded(prevLoaded => [...prevLoaded, true]);
  };

  const videoClass = loading ? 'app__videos--loading' : '';

  // const videoComponents = posts.map(({ _id, loading, ...props }, index) => {
  //   if (index + 1 === posts.length) {
  //     return (
  //       <Video
  //         key={_id}
  //         ref={lastPostElementRef}
  //         onVideoLoaded={handleVideoLoaded}
  //         loading={loading}
  //         {...props}
  //       />
  //     );
  //   }
  //   return (
  //     <Video
  //       key={_id}
  //       onVideoLoaded={handleVideoLoaded}
  //       loading={loading}
  //       {...props}
  //     />
  //   );
  // });

  const thisYear = new Date().getFullYear();

  // const backdropClass =
  // loading || allVideosLoaded.length !== posts.length ? 'show' : '';

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
        {/* {error ? <Error /> : loading ? <Backdrop /> : videoComponents} */}{' '}
        {/* PENDING USE LOADVIDEO COMPONENT WHEN LOAD FIRST TIME */}
        {error ? (
          <Error />
        ) : (
          <Videos
            posts={posts}
            handleVideoLoaded={handleVideoLoaded}
            lastPostElementRef={lastPostElementRef}
            allVideosLoaded={allVideosLoaded}
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
