import React, { useEffect, useState } from 'react';

import './App.css';
import axios from './apis/posts.instance';
import Video from './components/video';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('v2/posts');

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const videoComponents = posts.map(
    ({ _id, url, channel, description, song, likes, shares, messages }) => (
      <Video
        key={_id}
        url={url}
        channel={channel}
        description={description}
        song={song}
        likes={likes}
        shares={shares}
        messages={messages}
      />
    )
  );

  return (
    <div className="app">
      <div className="app__videos">{videoComponents}</div>
    </div>
  );
}

export default App;
