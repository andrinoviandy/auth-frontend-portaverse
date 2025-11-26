import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaLogo.png";
import PelindoLogo from "../../Components/Assets/Pictures/PelindoLogo.png";
import Illustration from "../../Components/Assets/Pictures/illustration-below.png";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import userAuthorization from "../../Utils/Helpers/userAuthorization";
import Products from "../ChooseProducts/Products";
import "../../Components/CssCustom/LandingPage.css";
import { generateCodeVerifier, generateCodeChallenge, generateNonce } from "./sso/pkce";

function LandingPageSso() {
  const { isAuthorized } = userAuthorization();

  const user = getUserCookie();

  if (isAuthorized && user?.employee?.is_official_account) {
    window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
    return null;
  }
  if (isAuthorized) {
    // window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
    window.location.href = `${window.location.origin}/landing`;
    return null;
  }

  const handleLoginSSO = async () => {
    const code_verifier = generateCodeVerifier();
    const code_challenge = await generateCodeChallenge(code_verifier);
    localStorage.setItem("pkce_code_verifier", code_verifier);
    const nonce = generateNonce();
    const redirectUri = encodeURIComponent(`${window.location.origin}/login/oauth2`);
    const authUrl =
      `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/auth` +
      `?response_type=code` +
      `&client_id=${import.meta.env.VITE_KEYCLOAK_CLIENT_ID}` +
      `&scope=${import.meta.env.VITE_KEYCLOAK_SCOPES}` +
      `&redirect_uri=${import.meta.env.VITE_KEYCLOAK_REDIRECT_URI_LOGIN}` +
      `&nonce=${nonce}` +
      `&state=${nonce}` +
      `&portal_si_app_id=${import.meta.env.VITE_KEYCLOAK_PORTAL_SI_APP_ID}` +
      `&code_challenge=${code_challenge}` +
      `&code_challenge_method=S256`;
    window.location.assign(authUrl);
    // window.location.href = `https://keycloak-qa.ilcs.co.id/realms/pelindo/protocol/openid-connect/auth?response_type=code&client_id=portaverse-web-local&scope=openid%20profile%20email&state=ztjyeId9UU0SjJPC83mUgm7uCzNZM92M2DnyWvik7gs&redirect_uri=http%3A%2F%2F10.8.3.175%3A8080%2Flogin%2Foauth2%2Fcode%2Fkeycloak&nonce=hBU_juPBLb2hctRmc56qBlohtv5ajQ&portal_si_app_id=8386&code_challenge=${code_challenge}&code_challenge_method=S256`
  };

  return (
    <div className="landing-page">
      {/* Logo Pelindo */}
      <div className="logo-pelindo">
        <img src={PelindoLogo} alt="Pelindo Logo" />
      </div>
      <div className="logo-portaverse">
        <img src={PortaverseLogo} alt="Pelindo Logo" />
      </div>

      {/* Kontainer utama */}
      <div className="login-container">
        <h1>Single Sign-On Implementation</h1>
        <p>
          Aplikasi Representasi Portaverse dengan integrasi SSO menggunakan Keycloak
          dan Portal-SI
        </p>
        <p className="subtitle">
          Silahkan masuk menggunakan Sign-On (SSO) untuk mengakses aplikasi
        </p>
        <div className="flex flex-row justify-center">
          <div className="justify-end mr-5">
            <a type="submit" id="keycloak-login-btn" className="btn" onClick={handleLoginSSO}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8425 3.16499C12.6225 0.95249 9.02249 0.95249 6.81749 3.16499C5.26499 4.70249 4.79999 6.91499 5.39999 8.86499L1.87499 12.39C1.62749 12.645 1.45499 13.1475 1.50749 13.5075L1.73249 15.1425C1.81499 15.6825 2.31749 16.1925 2.85749 16.2675L4.49249 16.4925C4.85249 16.545 5.35499 16.38 5.60999 16.1175L6.22499 15.5025C6.37499 15.36 6.37499 15.12 6.22499 14.97L4.76999 13.515C4.55249 13.2975 4.55249 12.9375 4.76999 12.72C4.98749 12.5025 5.34749 12.5025 5.56499 12.72L7.02749 14.1825C7.16999 14.325 7.40999 14.325 7.55249 14.1825L9.14249 12.6C11.085 13.2075 13.2975 12.735 14.8425 11.1975C17.055 8.98499 17.055 5.37749 14.8425 3.16499ZM10.875 8.99999C9.83999 8.99999 8.99999 8.15999 8.99999 7.12499C8.99999 6.08999 9.83999 5.24999 10.875 5.24999C11.91 5.24999 12.75 6.08999 12.75 7.12499C12.75 8.15999 11.91 8.99999 10.875 8.99999Z"
                  fill="white"
                />
              </svg>
              Masuk dengan SSO
            </a>
          </div>
          <div className="justify-start ml-5">
            <a className="btn btn-primary" href="/login">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8425 3.16499C12.6225 0.95249 9.02249 0.95249 6.81749 3.16499C5.26499 4.70249 4.79999 6.91499 5.39999 8.86499L1.87499 12.39C1.62749 12.645 1.45499 13.1475 1.50749 13.5075L1.73249 15.1425C1.81499 15.6825 2.31749 16.1925 2.85749 16.2675L4.49249 16.4925C4.85249 16.545 5.35499 16.38 5.60999 16.1175L6.22499 15.5025C6.37499 15.36 6.37499 15.12 6.22499 14.97L4.76999 13.515C4.55249 13.2975 4.55249 12.9375 4.76999 12.72C4.98749 12.5025 5.34749 12.5025 5.56499 12.72L7.02749 14.1825C7.16999 14.325 7.40999 14.325 7.55249 14.1825L9.14249 12.6C11.085 13.2075 13.2975 12.735 14.8425 11.1975C17.055 8.98499 17.055 5.37749 14.8425 3.16499ZM10.875 8.99999C9.83999 8.99999 8.99999 8.15999 8.99999 7.12499C8.99999 6.08999 9.83999 5.24999 10.875 5.24999C11.91 5.24999 12.75 6.08999 12.75 7.12499C12.75 8.15999 11.91 8.99999 10.875 8.99999Z"
                  fill="white"
                />
              </svg>
              Masuk dengan Portaverse
            </a>
          </div>
        </div>

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

export default LandingPageSso;
