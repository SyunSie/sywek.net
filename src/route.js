import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./view/home";
import editArticle from "./view/article/editArticle";
import myArticleList from "./view/article/myArticleList";
import signUp from "./view/signup/signUp";
import articleList from "./view/article/articleList";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  { path: "/newArticle", name: "newArticle", component: editArticle },
  { path: "/signup", name: "signUp", component: signUp },
  { path: "/user/profile", name: "profile", component: signUp },
  { path: "/article/:articlePath", name: "article", component: editArticle },
  { path: "/editArticle/:articlePath", name: "editArticle", component: editArticle },
  { path: "/myArticles", name: "myArticles", component: myArticleList },
  { path: "/articles", name: "articles", component: articleList },
  { path: "/user/:authorId", name: "authorInfo", component: articleList },
];

const router = new VueRouter({
  routes,
});

export default router;
