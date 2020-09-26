<template>
  <div class="articleContentH">
    <!-- <articleNav /> -->
    <main>
      <article>
        <articleHeader
          v-bind:articleInfo="cloneDeep(getArticle.articleInfo)"
          v-bind:readerInfo="getArticle.readerInfo"
          v-bind:authorInfo="getArticle.authorInfo"
          v-bind:editable="editable"
        />
        <hr id="articleHeader_hr" />
        <articleSection
          v-bind:section="section"
          v-bind:key="sectionIndex"
          v-bind:sectionIndex="sectionIndex"
          v-bind:editable="editable"
          v-for="(section, sectionIndex) in getArticle.sections"
        />
        <hr id="articleFooter_hr" />
        <articleFooter
          v-bind:editable="editable"
          :editArticleId="editArticleId"
        />
      </article>
    </main>
  </div>
</template>

<script>
import _ from "lodash";
import articleSection from "./articleSection";
import articleHeader from "./articleHeader";
import articleFooter from "./articleFooter";
// import articleNav from "./articleNav";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("articleStore");
export default {
  name: "sywekArticle",
  components: { articleSection, articleHeader, articleFooter },
  data: () => {
    return {};
  },
  props: ["editable", "editArticleId"],
  computed: {
    ...mapGetters(["getArticle"]),
    console: () => console,
  },
  methods: {
    cloneDeep(item) {
      return _.cloneDeep(item);
    },
  },
};
</script>

<style scoped>
.articleContentH {
  height: 100%;
}
article {
  color: rgb(206, 202, 195);
}
</style>
<style>
.editableRangeHover:hover {
  border-radius: 0.2rem;
  border-color: aqua;
  border-width: 0.01rem;
  border-style: dashed;
}
.editableRangeHover {
  border-color: transparent;
  border-style: dashed;
  border-width: 0.01rem;
}
hr {
  margin: 1rem auto;
  width: 90%;
  max-width: 750px;
  color: #9e9689;
  border-style: dashed;
}
</style>
