import type { OAuthConfig, OAuthUserConfig } from "."

export interface SpotifyImage {
  url: string
}

export interface SpotifyProfile extends Record<string, any> {
  id: string
  display_name: string
  email: string
  images: SpotifyImage[]
}
export default function Spotify<P extends SpotifyProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "spotify",
    name: "Spotify",
    type: "oauth",
    authorization:
      "https://accounts.spotify.com/authorize?scope=user-read-email",
    token: "https://accounts.spotify.com/api/token",
    userinfo: "https://api.spotify.com/v1/me",
    profile(profile) {
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        image: profile.images?.[0]?.url,
      }
    },
    style: {
      logo: "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/spotify.svg",
      logoDark:
        "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/spotify.svg",
      bg: "#fff",
      text: "#2ebd59",
      bgDark: "#fff",
      textDark: "#2ebd59",
    },
    options,
  }
}
