import React, { useState, useRef } from "react";

const playlist = [
  { id: 1, title: "Romantic Tune 1", src: "/music/song1.mp3" },
  { id: 2, title: "Romantic Tune 2", src: "/music/song2.mp3" },
  // Add your songs here
];

export default function MusicPlayerApp() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  function play() {
    audioRef.current.play();
  }
  function pause() {
    audioRef.current.pause();
  }
  function next() {
    setCurrentTrack((currentTrack + 1) % playlist.length);
  }
  function prev() {
    setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length);
  }

  return (
    <div>
      <h2>Music Player</h2>
      <div>Now Playing: {playlist[currentTrack].title}</div>
      <audio src={playlist[currentTrack].src} ref={audioRef} />
      <div style={{ marginTop: 10 }}>
        <button onClick={prev}>Prev</button>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
