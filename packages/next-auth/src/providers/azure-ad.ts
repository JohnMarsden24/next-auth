import type { OAuthConfig, OAuthUserConfig } from "."

export interface AzureADProfile extends Record<string, any> {
  sub: string
  nickname: string
  email: string
  picture: string
}

export default function AzureAD<P extends AzureADProfile>(
  options: OAuthUserConfig<P> & {
    /**
     * https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
     * @default 48
     */
    profilePhotoSize?: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648
    /** @default "common" */
    tenantId?: string
  }
): OAuthConfig<P> {
  const tenant = options.tenantId ?? "common"
  const profilePhotoSize = options.profilePhotoSize ?? 48

  return {
    id: "azure-ad",
    name: "Azure Active Directory",
    type: "oauth",
    wellKnown: `https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration?appid=${options.clientId}`,
    authorization: {
      params: {
        scope: "openid profile email",
      },
    },
    async profile(profile, tokens) {
      // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
      const profilePicture = await fetch(
        `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      )

      // Confirm that profile photo was returned
      if (profilePicture.ok) {
        const pictureBuffer = await profilePicture.arrayBuffer()
        const pictureBase64 = Buffer.from(pictureBuffer).toString("base64")
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: `data:image/jpeg;base64, ${pictureBase64}`,
        }
      } else {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      }
    },
    style: {
      logo: "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/azure.svg",
      logoDark:
        "https://raw.githubusercontent.com/nextauthjs/next-auth/ndom91/login-btn-styling/packages/next-auth/provider-logos/azure-dark.svg",
      bg: "#fff",
      text: "#0072c6",
      bgDark: "#0072c6",
      textDark: "#fff",
    },
    options,
  }
}
