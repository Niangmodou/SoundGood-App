import React from 'react';
import DiscoveredSong from '../Components/DiscoveredSong';

export default function DiscoveredSongs(props) {
  const tracks = props;

  console.log(props[tracks]);
  <section>
    <div className='dividerHeader'>
      <h2>Discovered Songs</h2>
    </div>
    {tracks.map((song) => {
      return <DiscoveredSong song={song} />;
    })}
  </section>;
}
