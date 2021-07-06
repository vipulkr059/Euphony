import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const MusicPlayer = ({ accessToken, trackUri }) => {
  const [play, setplay] = useState(false);
  useEffect(() => {
    setplay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) {
          setplay(false);
        }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default MusicPlayer;
