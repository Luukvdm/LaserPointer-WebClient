<template>
  <div class="myaccount">
    <div class="page-main-section">
      <div class="content">
        <div class="textblock">
          <h2>{{ oidcUser.preferred_username }}</h2>
          <p>
            You are logged in as {{ oidcUser.name }}. Your session started at
            {{ uDateToString(oidcUser.auth_time * 1000) }} and will end at
            {{ uDateToString(oidcIdTokenExp) }}.
          </p>
          <div class="account-tree">
            <span class="caret" @click="expand">Advanced information</span>
            <ul class="nested">
              <template v-for="(val, key) in oidcUser" v-bind:key="key">
                <li>
                  <b>{{ key }}:</b> {{ val }}
                </li>
              </template>
            </ul>
          </div>
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
    ...mapActions("oidcStore", ["signOutOidc", "authenticateOidc"]),

    expand(event) {
      let caret = event.target;
      caret.parentElement.querySelector(".nested").classList.toggle("active");
      caret.classList.toggle("caret-down");
    },
    uDateToString(uTime) {
      // let uTime = this.oidcUser.auth_time;
      let date = new Date(uTime);

      const year = date.getFullYear();
      const day = "" + date.getDate();
      const month = 1 + date.getMonth();
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      return (
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hours +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2)
      );
    }
  }
};
</script>

<style scoped>
.account-tree {
  text-align: left;
  margin: auto;
  max-width: 500px;
}

ul {
  list-style-type: none;
}

.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}

.nested {
  display: none;
  margin-top: 0;
}

.active {
  display: block;
}
</style>
