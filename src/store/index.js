import { createStore } from "vuex";
import oidcModule from "./oidcModule";

import { config } from "@/config/config";
import axios from "axios";

let store = createStore({
  state: {
    oidcConfig: {}
  },
  mutations: {
    setOidcConfig(state) {
      axios
        .get(`${config.idServerBaseUrl}/_configuration/${config.appName}`)
        .then(response => (state.oidcConfig = response.data));
    }
  },
  actions: {},
  modules: {
    oidcStore: oidcModule
  }
});

// store.commit("setOidcConfig");
export default store;
