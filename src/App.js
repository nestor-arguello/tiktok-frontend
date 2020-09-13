import React, { useEffect, useState } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

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
      <div className="app__videos">{videoComponents}</div>
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
