<template>
  <div id="app">
    <webHeader />
    <router-view />
  </div>
</template>

<script>
import webHeader from "./components/header";
export default {
  name: "App",
  components: { webHeader }
};
</script>

<style >
.hideEle {
  display: none;
}
.showEle {
  display: block;
}
body {
  /*/ background-color: rgb(33, 35, 37);*/
  background-color: rgba(0, 0, 0, 1);
  color: #eee;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
