/** @type {import(".").OAuthProvider} */
export default function Freshbooks(options) {
  return {
    id: "freshbooks",
    name: "Freshbooks",
    type: "oauth",
    version: "2.0",
    params: { grant_type: "authorization_code" },
    accessTokenUrl: "https://api.freshbooks.com/auth/oauth/token",
    authorizationUrl:
      "https://auth.freshbooks.com/service/auth/oauth/authorize?response_type=code",
    profileUrl: "https://api.freshbooks.com/auth/api/v1/users/me",
    async profile(profile) {
      return {
        id: profile.response.id,
        name: `${profile.response.first_name} ${profile.response.last_name}`,
        email: profile.response.email,
      }
    },
    style: {
      logo: "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/freshbooks.svg",
      logoDark:
        "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/freshbooks-dark.svg",
      bg: "#fff",
      text: "#0075dd",
      bgDark: "#0075dd",
      textDark: "#fff",
    },
    ...options,
  }
}
