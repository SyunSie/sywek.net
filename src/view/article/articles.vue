<template>
  <div class="marginContent">
    <div class="contentWidth">
      <div class="articleList">
        <div class="articleListHeader">
          <h1>Search Articles</h1>

          <button class="listRefreshBtn" @click="refreshList">
            <svg viewBox="0 0 24 24">
              <path
                d="M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z"
              />
            </svg>
          </button>
        </div>
        <h3 v-if="searchStr" class="searchInfo">Searh string : {{searchStr}}</h3>
        <h3 v-if="searchTag" class="searchInfo">Searh tag : {{searchTag}}</h3>
        <itemInViewportList
          ref="list"
          :triggerRules="rules"
          :that="this"
          inline-template
          v-on:scrollInViewport="itemInViewportFunc"
        >
          <div class="itemInViewportList">
            <inViewportItem
              v-for="info in that.articlesInfo"
              :that="that"
              :key="info.id"
              inline-template
            >
              <div class="listItems">
                <div class="leftInfos">
                  <img @click="that.articleLinkClickEvent(info.id)" :src="info.headerImage" />
                  <div class="listItemInfo">
                    <div class="itemHeader">
                      <h2 @click="that.articleLinkClickEvent(info.id)">{{info.articleHeader}}</h2>
                      <p>{{info.secondHeader}}</p>
                    </div>

                    <div class="itemDatetime">
                      <!-- <p>{{'Last Edit : '+info.lastEditDT}}</p> -->

                      <p>
                        post by :
                        <span
                          class="author"
                          @click="$router.push('/author/'+info.authorInfo.authorId)"
                        >{{info.authorInfo.authorName}}</span>
                        at {{info.postDT}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </inViewportItem>

            <div class="endLine" v-if="that.isFetchTheEndArticlesInfo">End of line...</div>
          </div>
        </itemInViewportList>
      </div>
    </div>
  </div>
</template>

<script>
// import isElementInViewport from "../../reference/elementInViewport";
import inViewportItem from "../../components/itemInViewportList/inViewportItem";
import itemInViewportList from "../../components/itemInViewportList";
import axios from "axios";
import Vue from "vue";
export default {
  name: "articles",
  components: { itemInViewportList, inViewportItem },
  data() {
    return {
      articlesInfo: [],
      isFetchTheEndArticlesInfo: false,
      fetchCount: 3,
      fetchOffset: 0,
      isFetching: false,
      rules: [],
      searchStr: "",
      searchTag: "",
    };
  },
  methods: {
    articleLinkClickEvent(articleId) {
      this.$router.push(`/article/@${articleId}`);
    },
    async refreshList() {
      //let _count = this.fetchCount,_offset=this.fetchOffset;
      Vue.set(this, "articlesInfo", []);
      this.isFetchTheEndArticlesInfo = false;
      const _oldFetchCount = this.fetchCount;
      this.fetchCount += this.fetchOffset;
      this.fetchOffset = 0;

      await this.searchArticlesAndSetRules();
      this.fetchCount = _oldFetchCount;
    },

    itemInViewportFunc() {
      if (this.isFetchTheEndArticlesInfo) return;
      this.searchArticlesAndSetRules();
    },
    autoSetRules() {
      Vue.set(this, "rules", [
        {
          index: this.articlesInfo.length - 1,
          direction: "any",
          axis: "y",
          type: "continue",
          inViewportType: "block",
        },
      ]);
    },
    async searchArticlesAndSetRules() {
      if (this.isFetching || this.fetchCount <= 0) return;
      this.isFetching = true;
      let _searchStr = this.$route.query.searchStr
          ? this.$route.query.searchStr.replace("_", " ")
          : "",
        _searchTag = this.$route.query.searchTag
          ? this.$route.query.searchTag.replace("_", " ")
          : "";
      this.searchStr = _searchStr;
      this.searchTag = _searchTag;
      let _articleInfo = await this.searchArticles(
        _searchStr,
        _searchTag,
        this.fetchCount,
        this.fetchOffset
      );

      if (_articleInfo.length != this.fetchCount) {
        this.isFetchTheEndArticlesInfo = true;
      }

      for (let i in _articleInfo) {
        let _info = _articleInfo[i];
        let _isFindItem = false;
        for (let j in this.articlesInfo) {
          if (this.articlesInfo[j].id == _info.id) {
            Vue.set(this.articlesInfo, j, _info);
            _isFindItem = true;
            break;
          }
        }
        if (!_isFindItem)
          this.articlesInfo.splice(this.articlesInfo.length, 0, _info);
      }

      this.fetchOffset += _articleInfo.length;

      this.autoSetRules();
      this.isFetching = false;
    },
    async searchArticles(_searchStr, _searchTag, _count, _offset) {
      if (_count <= 0 || _offset < 0) return undefined;

      let _ret = await axios.get(process.env.VUE_APP_API_URL + "/articles", {
        params: {
          searchStr: _searchStr,
          searchTag: _searchTag,
          searchCount: _count,
          searchOffset: _offset,
        },
      });

      if (_ret.data.msg == "Successed") {
        console.log("searchArticles", _ret.data);

        return _ret.data.articlesInfo;
      }
      console.log("searchArticles failed", _ret.data.msg);
      return undefined;
    },
  },
  async mounted() {
    await this.searchArticlesAndSetRules();
    console.log(this.$route);
    if (!this.isFetchTheEndArticlesInfo) {
      // cacualate client height of listItem's count,and fetch data to fill it.
      let _child = undefined;

      for (let index in this.$refs.list.$children) {
        if (
          this.$refs.list.$children[index].$options.name == "inViewportItem"
        ) {
          _child = this.$refs.list.$children[index].$el;
          break;
        }
      }
      let _itemH = _child.getBoundingClientRect().height;
      let _viewportH =
        document.documentElement.clientHeight || window.innerHeight;

      let _fetchCount = Math.ceil(_viewportH / _itemH) - this.fetchCount;
      const _oldCount = this.fetchCount;
      this.fetchCount = _fetchCount;

      await this.searchArticlesAndSetRules();
      this.fetchCount = _oldCount;
    }
  },
};
</script>

<style>
.author {
  color: blanchedalmond;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: underline;
}
.searchInfo {
  color: rgb(149, 146, 146);
}
</style>