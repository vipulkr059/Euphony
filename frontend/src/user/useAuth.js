import { useState, useEffect } from "react";
import axios from "axios";
const useAuth = (code) => {
  const [accessToken, setaccessToken] = useState();
  const [refreshToken, setrefreshToken] = useState();
  const [expiresIn, setexpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:8000/login", { code })
      .then((res) => {
        setaccessToken(res.data.accessToken);
        setexpiresIn(res.data.expiresIn);
        setrefreshToken(res.data.refreshToken);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8000/refresh", { refreshToken })
        .then((res) => {
          setaccessToken(res.data.accessToken);
          setexpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
