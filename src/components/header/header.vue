<template>
  <div class="headerDiv text-dis-select">
    <div
      :class="[hideNav? 'hideNav':'' ,!isScrollOnTop?'navBackColor':'']"
      class="webHeader text-border"
    >
      <h1 class="fontSize150">
        <router-link to="/">Sywek</router-link>
      </h1>

      <div id="nav">
        <div class="search">
          <svg @click="searchBtnClickFunc" x="0px" y="0px" viewBox="0 0 101 101">
            <path
              d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"
            />
          </svg>
          <div class="searchInputDiv">
            <input
              maxlength="50"
              @keyup.enter="searchBtnClickFunc"
              @click="$event.stopPropagation()"
              :class="showSearchInputs?'searchInputShow':''"
              v-model="searchStr"
              class="searchStr"
              type="text"
              placeholder="Search string..."
            />
            <input
              maxlength="50"
              @click="$event.stopPropagation()"
              @keyup.enter="searchBtnClickFunc"
              :class="showSearchInputs?'searchInputShow':''"
              v-model="searchTag"
              class="searchTag"
              type="text"
              placeholder="Search tags..."
            />
          </div>
        </div>
        <a class="fontSize110" v-if="!isLogin" href="#" @click="$emit('loginDisplay')">Log in</a>
        <router-link class="fontSize110" v-if="!isLogin" to="/signup">Sign Up</router-link>
        <div v-if="userInfo" class="userHeaderImg" @click="setUserNavDisp">
          <p>{{userInfo.name}}</p>

          <img :src="userInfo.userImage" />
        </div>
      </div>
    </div>
    <p class="flash" ref="flash" v-text="flashMsg">asd</p>
    <div v-if="isLogin&&isUserNavDisp" class="userNav">
      <router-link to="/user/profile">Profile</router-link>
      <hr />
      <router-link to="/newArticle">New Article</router-link>
      <router-link to="/myArticles">My Articles</router-link>
      <hr />

      <a v-if="isLogin" href="#" @click="$emit('logOut')">Log Out</a>
    </div>
    <!-- <button
      @click="setFlashMsg('Account invadshfibgjksdfbgisdfjbgdfjkbgjkdfb sdjkfbgsjkd bgi sdb kjlid',2000,'common')"
    >test</button>-->
  </div>
</template>

<script>
import { scrollInfo_InnerFunc } from "../../reference/scrollFunctions";
import asyncTimer from "../../reference/asyncTimer";

// import sywekAxios from "../../reference/axiosMsgReaction";
export default {
  name: "webHeader",
  data() {
    return {
      flashMsg: "",
      isUserNavDisp: false,
      setUserNavDisp_Func: undefined,
      hideNav: false,
      isScrollOnTop: true,
      searchStr: "",
      searchTag: "",
      showSearchInputs: false,
    };
  },
  methods: {
    _searchClickFunc() {
      this.showSearchInputs = !this.showSearchInputs;
      if (!this.showSearchInputs) {
        document.removeEventListener("click", this._searchClickFunc);
      }
    },
    searchBtnClickFunc() {
      if (!this.showSearchInputs) {
        // this.showSearchInputs = true;

        document.addEventListener("click", this._searchClickFunc);

        return;
      }

      let _searchStr = this.searchStr ? this.searchStr.replace(" ", "_") : "",
        _searchTag = this.searchTag ? this.searchTag.replace(" ", "_") : "";

      this.$router
        .push({
          path: "/articles",
          query: { searchStr: _searchStr, searchTag: _searchTag },
        })
        .catch(() => {});

      this._searchClickFunc();
      document.activeElement.blur();
    },
    // async searchArticles() {
    //   let _data = await get(
    //     process.env.VUE_APP_API_URL + "/article",
    //     {
    //       params: {
    //         searchStr: "",
    //         searchTag: "",
    //         searchCount: 10,
    //         searchOffset: 0,
    //       },
    //     }
    //   );

    //   console.log("test", _data);
    // },
    setUserNavDisp() {
      if (this.isUserNavDisp) return;

      let _func = () => {
        if (!this.isUserNavDisp) {
          this.isUserNavDisp = true;
          return;
        }
        this.isUserNavDisp = false;
        document.removeEventListener("click", _func);
      };
      document.addEventListener("click", _func);
    },
    async setFlashMsg(msg, flashmsec, msgType) {
      let msgTypeClsStr = "";
      if (msgType == "common") msgTypeClsStr = "flash-commonmsg";
      else if (msgType == "error") msgTypeClsStr = "flash-errormsg";

      //set msg to this.flashMsg
      this.flashMsg = msg;
      //set msg tag display
      this.$refs.flash.classList.add(msgTypeClsStr);
      // set timer using await,
      await asyncTimer(flashmsec);
      // set msg tag hideen
      this.$refs.flash.classList.remove(msgTypeClsStr);
    },
  },
  props: ["userInfo", "isLogin"],
  mounted() {
    // add scroll function
    // let _body = document.querySelector("body");

    let _scrollFunc = scrollInfo_InnerFunc(window);
    let prevDirection = "";
    let startPixel = 0;
    const workPixel = 100;
    let _func = () => {
      // if (window.innerWidth > 767) return;
      let _scrollRet = _scrollFunc();

      if (_scrollRet.axis == "y") {
        if (prevDirection != _scrollRet.direction) {
          // startPixel = _body.scrollTop;
          startPixel = window.scrollY;
          prevDirection = _scrollRet.direction;
        }
        if (Math.abs(window.scrollY - startPixel) >= workPixel) {
          if (_scrollRet.direction == "forward") {
            this.hideNav = true;
            this.isScrollOnTop = false;
          } else if (_scrollRet.direction == "reverse") {
            this.hideNav = false;
          }
        }

        if (Math.round(window.scrollY) == 0) {
          this.isScrollOnTop = true;
          this.hideNav = false;
        }
      }
    };
    window.addEventListener("scroll", _func);
  },
};
</script>

<style scoped>
.headerDiv {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;
}
.webHeader > h1 {
  margin: 0.2rem 1rem;
}

.webHeader {
  transition: all 600ms;
  background: transparent;
  color: #fff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.webHeader a {
  color: #fff;
  padding-right: 10px;
}

#nav {
  line-height: 2.8rem;
  margin: 0.2rem 1rem;
  display: flex;
  font-size: 1.2rem !important;
  font-weight: 500;
  align-items: center;
}
button {
  border-style: none;
  color: #fff;
  background: transparent;
}
a {
  border-radius: 1rem;
  padding: 0rem 1rem;
  /* margin: 0 10px; */
  text-decoration: none;
  transition: color 300ms;
}
a:hover {
  color: rgb(35, 187, 200);
}
.flash {
  /* height: 1.6rem; */
  font-size: 1.2rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  background-color: transparent;
  color: transparent;
  border-color: transparent;

  margin: 0, auto;
  text-align: center;

  border-style: none;
  border-bottom-style: solid;
  transition: all 500ms;
  border-width: 1px;
}
.flash-errormsg {
  color: red;
  /* background-color: pink; */
  border-color: lightskyblue;
}
.flash-commonmsg {
  color: rgb(15, 173, 15);
  /* background-color: rgb(130, 174, 202); */
  border-color: rgb(164, 216, 248);
}
.userHeaderImg {
  display: flex;
  flex-direction: row;
  background-color: rgba(51, 51, 51, 0.383);
  border: darkgrey solid 1px;
  padding: 0.1rem 0.2rem;
  align-items: center;
  cursor: pointer;
  border-radius: 2rem;
  font-size: 1rem;
  transition: all 600ms;
}
.userHeaderImg:hover {
  background-color: rgba(22, 22, 2, 0.8);
}
.userHeaderImg > img {
  width: 40px;
  height: 40px;
  shape-outside: circle(50%);
  border-radius: 50%;
  margin-left: 0.5rem;
}
.userNav {
  background-color: #444;
  z-index: 1003;
  min-width: 180px;
  /* height: 100px; */
  position: fixed;
  right: calc(2% + 2rem);
  top: 55px;
  border-radius: 0.7rem;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
}
.userNav a {
  /* position: relative; */

  color: wheat;
  padding: 0.5rem auto;
  height: 2.5rem;
  line-height: 2.5rem;
  transition: color 600ms;
}
.userNav a:hover {
  color: royalblue;
}
.userNav > hr {
  width: 100%;
  border: none;
  border-top: grey solid 1px;
}
.search {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.searchInputDiv input {
  transition: all 600ms;
  width: 0;
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  border: none;
  background-color: whitesmoke;
  /* display: none; */
}
.searchInputShow {
  /* display: block !important; */
  width: 15rem !important;
  border: grey solid 1px !important;
  padding: 0.2rem !important;
}
.search svg {
  stroke: black;
  fill: whitesmoke;
  height: 35px;
  width: 35px;
}
@media screen and (max-width: 1300px) {
  .hideNav {
    transform: translateY(-66px);
  }
  .navBackColor {
    background-color: #333;
  }
}
@media screen and (max-width: 950px) {
  .searchInputDiv {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 66px;
    right: 15%;
  }
}
@media screen and (max-width: 484px) {
  .fontSize150 {
    font-size: 1.5rem;
  }
  .fontSize110 {
    font-size: 1.1rem;
  }
  .userNav {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
  .userHeaderImg > p {
    display: none;
  }
}
</style>
