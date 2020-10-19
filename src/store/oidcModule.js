import { vuexOidcCreateStoreModule } from "vuex-oidc";
import { oidcConfig } from "@/config/oidc";
import axios from "axios";

console.log(oidcConfig);

export default vuexOidcCreateStoreModule(
  oidcConfig,
  {
    namespaced: true
    //dispatchEventsOnWindow: true
  },
  // Optional OIDC event listeners
  {
    userLoaded: user => {
      console.log("OIDC user is loaded:", user);
      console.log("Setting default authorize header for axios...");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.access_token}`;
    },
    userUnloaded: () => console.log("OIDC user is unloaded"),
    accessTokenExpiring: () => console.log("Access token will expire"),
    accessTokenExpired: () => {
      console.log("Access token did expire");
    },
    silentRenewError: () => console.log("OIDC user is unloaded"),
    userSignedOut: () => console.log("OIDC user is signed out"),
    oidcError: payload => console.log("OIDC error", payload)
  }
);
