import { useCallback, useRef } from 'react';

const useLastPostObserver = ({
  loading,
  hasMore,
  posts,
  allVideosLoaded,
  setCurrentPage,
}) => {
  const observer = useRef();
  const scrollAreaRef = useRef();

  return {
    scrollAreaRef,
    lastPostElementRef: useCallback(
      node => {
        if (loading || allVideosLoaded.length !== posts.length) return;

        if (observer.current) {
          observer.current.disconnect();
        }
        const options = {
          threshold: 1,
          root: scrollAreaRef.current,
        };
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage(prevPage => ++prevPage);
          }
        }, options);

        if (node) {
          observer.current.observe(node);
        }
      },
      [loading, hasMore, posts, allVideosLoaded, setCurrentPage]
    ),
  };
};

export default useLastPostObserver;
