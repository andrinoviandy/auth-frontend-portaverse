import { Icon } from "@iconify/react";
import { Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { memo, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import EyeOffOutline from "../../Components/Assets/Icon/EyeOffOutline";
import EyeOutline from "../../Components/Assets/Icon/EyeOutline";
import LoadingButton from "../../Components/Assets/Icon/LoadingButton";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogo.png";
import postLoginSso from "../../Networks/LoginSso";
import postLoginSsoV2 from "../../Networks/LoginSsoV2";
import useValidateInput from "../../Utils/Hooks/useValidateInput";
import PelindoLogo from "../../Components/Assets/Pictures/PelindoLogo.png";
import Illustration from "../../Components/Assets/Pictures/illustration-below.png";
import "../../Components/CssCustom/LoginKeycloak.css";
import { generateCodeChallenge, generateCodeVerifier } from "../LandingPage/sso/pkce";

function LoginKeycloak() {
  const location = useLocation();
  const hasRun = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Sedang Proses");
  const ISSUER = import.meta.env.VITE_KEYCLOAK_ISSUER;
  const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID; // pastikan sama seperti di Keycloak
  const REDIRECT_URI = `${window.location.origin}/loginKeycloak`;

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const postKeycloak = async () => {
      setIsLoading(true)
      const loginMy = getQueryParam('loginMy');
      let pkceCode;
      if (loginMy === 'true' || loginMy === true) {
        console.log("loginMy : true");
        
        const code_verifier = generateCodeVerifier();
        const code_challenge = await generateCodeChallenge(code_verifier);
        pkceCode = code_verifier;
        localStorage.setItem("pkce_code_verifier", code_verifier);
      } else {
        pkceCode = localStorage.getItem("pkce_code_verifier");
      }

      if (!pkceCode) {
        window.location.href = `${window.location.origin}/landing`;
        return
      } else {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (!code) return;

        const tokenUrl = `${ISSUER}/protocol/openid-connect/token`;
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("client_id", CLIENT_ID);
        params.append("code", code);
        params.append("code_verifier", localStorage.getItem("pkce_code_verifier"));
        params.append("redirect_uri", REDIRECT_URI);

        try {
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("Keycloak token request failed");
          } else {
            // await postLoginSso(data, setIsLoading, setFetchError);
            await postLoginSsoV2(data, setIsLoading, setMessage);
            localStorage.removeItem("pkce_code_verifier");
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      }
    };

    postKeycloak();
  }, []);

  return (
    <div className="landing-page">
      {/* Logo Pelindo */}
      <div className="logo-pelindo">
        <img src={PelindoLogo} alt="PELINDO Logo" />
      </div>

      {/* Kontainer utama */}
      <div className="login-container">
        <h1>Please Wait</h1>
        <p className="loading-dots">
          {message}
        </p>

        <div className="illustration-container">
          <img
            src={Illustration}
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginKeycloak;
