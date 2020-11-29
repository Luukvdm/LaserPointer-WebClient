import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import { vuexOidcCreateRouterMiddleware } from "vuex-oidc";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));

export default router;
