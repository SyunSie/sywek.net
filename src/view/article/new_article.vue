<template>
  <div class="marginContent">
    <div class="contentWidth">
      <sywekArticle :editable="editable" :editArticleId="editArticleId" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations } = createNamespacedHelpers("articleStore");
import sywekArticle from "../../components/article/";
export default {
  name: "newArticle",
  components: { sywekArticle },
  methods: {
    ...mapActions(["fetchArticle"]),
    ...mapMutations(["setArticle", "updateNav"]),
  },
  data() {
    return {
      editable: true,
      editArticleId: -1,
    };
  },
  props: ["isLogin"],

  async mounted() {
    // console.log("article mounted!!!");

    const _routerName = this.$route.name;
    if (_routerName == "newArticle" || _routerName == "editArticle") {
      //check isLogin when flase then redirect to error-401
      let _articleId =
        _routerName == "newArticle"
          ? -999
          : Number(this.$route.params.articlePath);

      //render sessionstorage if exist
      if (sessionStorage.tempNewArticle) {
        this.setArticle(JSON.parse(sessionStorage.tempNewArticle));
        return;
      }
      //using store.this.fetchArticle() to fetch new article
      let _ret = await this.fetchArticle({
        articleId: _articleId,
        isEdit: true,
      });

      //rerender article data when axios return successed
      if (_ret.msg != "Successed") {
        // show error msg
        this.$router.push("/404");
        return;
      }

      //set this.editable to true
      this.editable = true;
      this.editArticleId = _articleId;
    } else if (_routerName == "article") {
      // get articl-id from this.$route.param.articlePath.filter('@');
      let _articleId = this.$route.params.articlePath.split("@");
      _articleId = Number(_articleId[_articleId.length - 1]);
      // validate articleId

      if (isNaN(_articleId)) {
        this.$router.push("/404");
        return;
      }
      // using axios to fetch article by article-id
      // check axios-get successed then rerender data
      //    - if axios return error then redirect to error-404

      let _ret = await this.fetchArticle({
        articleId: _articleId,
        isEdit: false,
      });

      if (_ret.msg != "Successed") {
        this.$router.push("/404");
        return;
      }
      // push url without redirect using window.history.pushState('','','/<header>@<articleId>')

      let _header =
        _ret.articleHeader.replace(/(?: )/g, "_") + "@" + _ret.articleId;
      window.history.replaceState("", "", `/#/article/${_header}`);
      // set this.editAble to false
      this.editable = false;
    }
    this.updateNav();
  },
};
</script>

<style scoped>
</style>
