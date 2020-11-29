import DefaultView from "@/components/defaultView.vue";

import Home from "@/components/views/home.vue";

import myAccount from "@/components/views/account/myAccount.vue";

import createJob from "@/components/views/job/create.vue";

import OidcCallback from "@/components/views/oidc/oidcCallback.vue";
import OidcPopupCallback from "@/components/views/oidc/oidcPopupCallback.vue";
import OidcCallbackError from "@/components/views/oidc/oidcCallbackError.vue";

const routes = [
  {
    path: "/",
    component: DefaultView,
    children: [
      {
        path: "home",
        alias: "",
        name: "Home",
        component: Home,
        meta: {
          isPublic: true
        }
      },
      {
        path: "about",
        alias: "",
        name: "About",
        component: Home,
        meta: {
          isPublic: true
        }
      },
      {
        path: "account",
        name: "My Account",
        component: myAccount,
        meta: {
          isPublic: false
        }
      }
    ]
  },
  {
    path: "/job/",
    component: DefaultView,
    children: [
      {
        path: "create",
        name: "CreateJob",
        component: createJob,
        meta: {
          isPublic: false
        }
      }
    ]
  },
  {
    path: "/oidc/",
    component: DefaultView,
    children: [
      {
        path: "callback",
        name: "oidcCallback",
        component: OidcCallback,
        meta: {
          isPublic: true
        }
      },
      {
        path: "popup-callback",
        name: "oidcPopupCallback",
        component: OidcPopupCallback,
        meta: {
          isPublic: true
        }
      },
      {
        path: "callback-error",
        name: "oidcCallbackError",
        component: OidcCallbackError,
        meta: {
          isPublic: true
        }
      }
    ]
  }
];

export default routes;
