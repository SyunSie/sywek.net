<template>
  <section>
    <div class="section_layout">
      <contentElement
        v-for="(contentEle, contentEleIndex) in section.contentElements"
        v-bind:key="contentEleIndex"
        v-bind:contentEle="cloneDeep(contentEle)"
        v-bind:sectionIndex="sectionIndex"
        v-bind:contentEleIndex="contentEleIndex"
        v-bind:editable="editable"
      />
    </div>
  </section>
</template>

<script>
import _ from "lodash";
import contentElement from "./contentElement";
export default {
  name: "articleSection",
  props: ["section", "sectionIndex", "editable"],
  data: () => {
    return {};
  },
  methods: {
    cloneDeep(item) {
      return _.cloneDeep(item);
    }
  },
  components: { contentElement }
};
</script>

<style scoped>
.section_layout {
  max-width: 750px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}
</style>
