<template>
  <div id="app">
    <div ref="viewport" :class="{blur1 : blurDisplay}">
      <webHeader
        v-on:loginDisplay="setLoginDisplay(true)"
        :userInfo="userInfo"
        :isLogin="isLogin"
        v-on:logOut="logout"
      />
      <router-view :key="$route.fullPath" v-bind:isLogin="isLogin" />
    </div>
    <logIn
      v-on:login-exit="setLoginDisplay(false)"
      v-if="loginDisplay"
      v-on:updateUserInfo="updateUserInfo"
    />
  </div>
</template> 

<script>
import webHeader from "./components/header/header";
import logIn from "./components/login";

import sywekAxios from "./reference/axiosMsgReaction";
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations } = createNamespacedHelpers("appStore");
export default {
  name: "App",
  components: { webHeader, logIn },
  data() {
    return {
      loginDisplay: false,
      isLogin: false,

      userInfo: { name: "", userImage: "" },
    };
  },
  async mounted() {
    // console.log("VueApp Mounted!!!");

    let _data = await sywekAxios.get(
      process.env.VUE_APP_API_URL + "/session",
      {},
      true
    );

    if (_data.msg == "Successed") {
      localStorage.userInfo = JSON.stringify(_data.token);
    } else {
      localStorage.removeItem("userInfo");
    }
    this.updateUserInfo();

    //Axios fetch login data////////////////////////////////////////////////////////////////////////
  },
  computed: {
    ...mapGetters(["blurDisplay"]),
  },
  methods: {
    ...mapMutations(["set_blurDisplay"]),
    async logout() {
      // console.log("logout");
      await sywekAxios.delete(
        process.env.VUE_APP_API_URL + "/session",
        {},
        true
      );

      localStorage.removeItem("userInfo");
      this.isLogin = false;
      this.updateUserInfo();
    },
    updateUserInfo() {
      if (localStorage.userInfo) {
        // console.log("update user info 1");
        // console.log("localStorage", localStorage.userInfo);
        // this.userInfo = localStorage.userInfo;
        Vue.set(this.$data, "userInfo", JSON.parse(localStorage.userInfo));

        this.isLogin = true;
      } else {
        this.isLogin = false;
        // console.log("update user info 2");
        Vue.set(this.$data, "userInfo", undefined);
      }
    },
    getUserInfoAndStoreInLocalStorage() {},
    setLoginDisplay(isDisp) {
      this.loginDisplay = isDisp;
      this.set_blurDisplay(isDisp);
      // if (isDisp) {
      //   this.loginDisplay = true;
      //   // this.$refs.viewport.classList.add("blur1");
      //   this.set_blurDisplay(true);
      // } else {
      //   this.loginDisplay = false;
      //   // this.$refs.viewport.classList.remove("blur1");
      //   this.set_blurDisplay(false);
      // }
    },
  },
};
</script>

<style >
* {
  margin: 0;
}
.hideEle {
  display: none;
}
.showEle {
  display: block;
}
button {
  outline: none;
}
html,
body {
  min-height: 100%;
  position: relative;
  overflow: auto;
}
body {
  /*/ background-color: rgb(33, 35, 37);*/
  background-color: rgba(0, 0, 0, 1);
  color: #eee;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.blur1 {
  transition: all 600ms;
  filter: blur(2px);
}
.text-border {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
.text-dis-select {
  user-select: none;
}
.marginContent {
  padding-top: 66px;
  height: calc(100vh - 66px);
}
.contentWidth {
  max-width: 750px;
  margin: 0 auto;
}

::-webkit-scrollbar {
  width: 12px;
  height: 8px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 1rem;
  border-radius: 1rem;
  margin: 0 0.2rem;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 4px;
  border-radius: 4px;
  background: rgba(53, 52, 52, 0.623);
}

@media screen and (max-width: 767px) {
  .contentWidth {
    width: 90%;
  }
}
/* @media screen and (max-width: 767px) {
  .marginContent {
    flex-direction: column;
  }
} */
</style>
