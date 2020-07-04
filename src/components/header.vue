<template>
  <div class="webHeader">
    <h1>Sywek</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/newArticle">New Article</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "webHeader",
};
</script>

<style scoped>
.webHeader h1 {
  margin: 0;
}
.webHeader {
  background: transparent;
  color: #fff;
  text-align: right;
  padding-right: 20px;
}
.webHeader a {
  color: #fff;
  padding-right: 10px;
}
</style>
