<template>
  <nav ref="nav" class="articleNav navHide">
    <ul :key="sTindex" v-for="(sTNavItem,sTindex) in getArticleNavInfo">
      <a class="subTitle_a" data-scroll :href="'#'+sTNavItem.navId">{{sTNavItem.text}}</a>

      <li :key="hIndex" v-for="(hNavItem,hIndex) in sTNavItem.headers">
        <a class="header_a" data-scroll :href="'#'+hNavItem.navId">{{hNavItem.text}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapMutations } = createNamespacedHelpers("articleStore");
export default {
  name: "articleNav",

  methods: {
    ...mapMutations(["updateNav"]),
  },
  computed: {
    ...mapGetters(["getArticleNavInfo"]),
  },
  mounted() {
    this.updateNav();
    //console.log(this.getArticleNavInfo);
    const navSpace = 65;

    function offsetAnchor() {
      if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - navSpace);
      }
    }
    window.addEventListener("hashchange", offsetAnchor);
    window.setTimeout(offsetAnchor, 1);

    //register window scroll event , the event will detect scroll bar position , and show articleNav when scroll under articleHeader_hr.

    let articleH_hr = document.getElementById("articleHeader_hr");

    let thisNav = this.$refs.nav;

    if (articleH_hr != undefined) {
      // console.log("register events");

      window.addEventListener("scroll", function navScrollEFunction() {
        if (window.pageYOffset >= articleH_hr.offsetTop - navSpace * 2) {
          thisNav.classList.add("navDisplay");
          thisNav.classList.remove("navHide");
        } else {
          thisNav.classList.remove("navDisplay");
          thisNav.classList.add("navHide");
        }
      });
    } else {
      thisNav.classList.add("articleH_hr");
    }
  },
};
</script>

<style scoped>
.navDisplay {
  opacity: 1;
  background-color: #222;
  border-radius: 0 1rem 1rem 0;
}
.navHide a {
  opacity: 0;
  pointer-events: none;
  cursor: default;
  background-color: transparent;
}
.navDisplay a {
  opacity: 1;
}
.navHide a {
  opacity: 0;
}
.articleNav {
  position: fixed;

  top: 3rem;
}
a {
  transition: opacity 600ms;
  color: whitesmoke;
  text-decoration: none;
}
ul {
  padding: 0;
  margin: 1rem;
}
li {
  list-style-type: none;
}
a:hover {
  color: orange;
  transition: all 400ms;
}
.subTitle_a {
  font-size: 1.5rem;
}
.header_a {
  margin-left: 1rem;
  font-size: 1.1rem;
}
</style>