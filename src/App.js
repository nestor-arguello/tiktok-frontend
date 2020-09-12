import React from 'react';

import './App.css';
import Video from './components/video';

function App() {
  return (
    <div className="app">
      <div className="app__videos">
        <Video
          url="https://assets.mixkit.co/videos/preview/mixkit-urban-trendy-girls-portrait-at-night-1231-large.mp4"
          channel="shantilli"
          description="Some description text"
          song="So Lonely - The Police"
          likes={122}
          shares={12}
          messages={33}
        />
        <Video
          url="https://assets.mixkit.co/videos/preview/mixkit-motionless-woman-sitting-on-the-floor-watching-mechanical-flying-chairs-2824-large.mp4"
          channel="gilmore"
          description="This is it"
          song="Comfortably numb - Pink Floyd"
          likes={233}
          shares={34}
          messages={345}
        />
      </div>
    </div>
  );
}

export default App;
