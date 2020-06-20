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

<style>
</style>
