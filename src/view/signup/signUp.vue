<template>
  <div class="marginContent">
    <signUpForm :userProfile="userProfile" />
  </div>
</template>

<script>
import signUpForm from "../../components/signup";
import sywekAxios from "../../reference/axiosMsgReaction";
import Vue from "vue";
export default {
  name: "signUp",
  components: { signUpForm },
  data() {
    return {
      userProfile: undefined,
    };
  },
  async beforeMount() {
    let _routeName = this.$route.name;
    if (_routeName == "profile") {
      let _data = await sywekAxios.get(
        process.env.VUE_APP_API_URL + "/user/profile",
        {},
        true
      );

      if (_data.msg == "Successed") {
        Vue.set(this, "userProfile", _data.userProfile);
      }
    }
  },
};
</script>

<style scoped>
div {
  height: 100%;
}
</style>
