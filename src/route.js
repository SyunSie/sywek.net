import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./view/home";
import newArticle from "./view/article/new_article";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/newArticle", name: "newArticle", component: newArticle },
];

const router = new VueRouter({
  routes,
});

export default router;
