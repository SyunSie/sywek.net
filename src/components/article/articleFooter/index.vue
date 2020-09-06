<template>
  <footer>
    <div v-if="editable" class="editArticleDiv">
      <label>
        <input type="checkbox" v-model="postWithPublic" />Post article with public.
      </label>
      <button @click="postNewArticle">Post Article 》</button>
    </div>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("articleStore");
// const { mapMutations: appMutations } = createNamespacedHelpers("appStore");
export default {
  data() {
    return {
      postWithPublic: false,
    };
  },
  name: "articleFooter",
  props: ["editable", "editArticleId"],
  methods: {
    ...mapActions(["postArticle"]),
    // ...appMutations(["set_blurDispaly"]),
    async postNewArticle() {
      let _postRet = await this.postArticle({
        articleStatus: this.postWithPublic,
        articleId: this.editArticleId,
      });

      console.log("post article footer-> _postRet", _postRet);

      if (_postRet.msg == "Successed") {
        _postRet.articleStatus
          ? this.$router.push(`/article/@${_postRet.articleId}`)
          : this.$router.push("/myArticles");
      } else {
        console.log("Article post error : ", _postRet.msg);
      }
    },
  },
};
</script>
<style scoped>
footer {
  max-width: 750px;
  width: 100%;
  min-height: 10rem;
  margin: 2rem auto;
}
.editArticleDiv > button {
  background-color: rgb(66, 233, 149);
  color: black;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 0.3rem;
  border-color: rgb(138, 177, 164);

  outline: none;
  transition: all 500ms;
  padding: 0.2rem 1rem;
  width: 100%;
}
.editArticleDiv > button:hover {
  color: white;
}
.editArticleDiv > label {
  font-size: 1.2rem;
  margin: 0.5rem;
}
.editArticleDiv input {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}
</style>
