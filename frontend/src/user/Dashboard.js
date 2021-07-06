import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import MusicPlayer from "./MusicPlayer";
import TrackSearchResult from "./TrackSearchResult";
import useAuth from "./useAuth";

const spotifyapi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [playingTrack, setplayingTrack] = useState();
  const accessToken = useAuth(code);
  console.log(searchresult);

  const chooseTrack = (track) => {
    setplayingTrack(track);
    setsearch("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyapi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setsearchresult([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyapi.searchTracks(search).then((res) => {
      if (cancel) return;
      setsearchresult(
        res.body.tracks.items.map((tracks) => {
          const smallestImg = tracks.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, tracks.album.images[0]);
          return {
            artist: tracks.artists[0].name,
            title: tracks.name,
            uri: tracks.uri,
            albumUrl: smallestImg.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);
  return (
    <div className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <input
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchresult.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <MusicPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Dashboard;
