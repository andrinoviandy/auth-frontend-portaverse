// pkce.js

// Generate PKCE Code Verifier
export function generateCodeVerifier(length = 64) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  const string = String.fromCharCode(...array);

  return btoa(string)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Generate PKCE Code Challenge
export async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(digest));
  const base64 = btoa(String.fromCharCode(...hashArray));

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Generate random nonce
export function generateNonce(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}