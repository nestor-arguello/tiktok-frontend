import { useEffect, useState } from 'react';
import axios from '../apis/posts.instance';

export default function (pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchPosts = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'v2/posts',
          params: {
            page: pageNumber,
          },
        });

        const totalPages = response.data.total_pages;

        setHasMore(totalPages !== pageNumber);

        setPosts(prevPosts => [...prevPosts, ...response.data.data]);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pageNumber]);

  return {
    error,
    loading,
    posts,
    hasMore,
  };
}
