import React from "react";
import { LoginDiv } from "./styling/loginStyle";

const Auth_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <div>
      <LoginDiv>
        <p>Welcome To Euphony</p>
        <a href={Auth_URL}>
          <button>Login With Spotify</button>
        </a>
      </LoginDiv>
    </div>
  );
};

export default Login;
