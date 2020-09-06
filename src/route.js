import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./view/home";
import newArticle from "./view/article/new_article";
import myArticles from "./view/article/myArticles";
import signUp from "./view/signup/signUp";
import articles from "./view/article/articles";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  { path: "/newArticle", name: "newArticle", component: newArticle },
  { path: "/signup", name: "signUp", component: signUp },
  { path: "/article/:articlePath", name: "article", component: newArticle },
  { path: "/editArticle/:articlePath", name: "editArticle", component: newArticle },
  { path: "/myArticles", name: "myArticles", component: myArticles },
  { path: "/articles", name: "articles", component: articles },
];

const router = new VueRouter({
  routes,
});

export default router;
