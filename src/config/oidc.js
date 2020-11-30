// export const oidcConfig = JSON.parse(process.env.VUE_APP_OIDC_CONFIG);
let baseUrl = process.env.VUE_APP_BASE_IDENTITY_SERVER_URL;
let appName = process.env.VUE_APP_APP_NAME;

export const oidcConfig = {
  authority: "https://" + baseUrl + "/",
  clientId: appName,
  redirectUri: "https://" + baseUrl + "/#/oidc/callback",
  popupRedirectUri: "https://" + baseUrl + "/#/oidc/popup-callback",
  responseType: "code",
  scope: "openid profile",
  automaticSilentRenew: true,
  automaticSilentSignin: false,
  silentRedirectUri: "https://" + baseUrl + "/#/oidc/silent-renew.html"
}


/*
let appname = process.env.VUE_APP_APP_NAME;

async function getConfig() {
  let promise = axios.get(`${config.idServerBaseUrl}/_configuration/${config.appName}`)
  let result = await promise;
  return result.data;
}

const config = await getConfig();

// Combine configs
export const oidcSettings = {
  authority: config.authority,
  clientId: config.client_id,
  redirectUri: envConfig.redirectUri,
  popupRedirectUri: envConfig.popupRedirectUri,
  responseType: config.response_type,
  scope: config.scope,
  automaticSilentRenew: envConfig.automaticSilentRenew,
  automaticSilentSignin: envConfig.automaticSilentSignin,
  silentRedirectUri: envConfig.silentRedirectUri
}
*/
