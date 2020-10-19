<template>
  <div class="myaccount">
    <div class="page-main-section">
      <div class="content">
        <div class="textblock">
          <h2>{{ oidcUser.name }}</h2>
          <p>
            {{ oidcUser }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "account",
  computed: {
    ...mapGetters("oidcStore", [
      "oidcIsAuthenticated",
      "oidcAuthenticationIsChecked",
      "oidcUser",
      "oidcIdToken",
      "oidcIdTokenExp",
      "access_token"
    ])
  },
  methods: {
    ...mapActions("oidcStore", ["signOutOidc", "authenticateOidc"])
  }
};
</script>
