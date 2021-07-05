import React from "react";

const Auth_URL =
  "https://accounts.spotify.com/authorize?client_id=fecbdab5390d4ce7949cf3ff818b5f09&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <div>
      <a href={Auth_URL}>Login With Spotify</a>
    </div>
  );
};

export default Login;
