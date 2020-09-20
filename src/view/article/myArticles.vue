<template>
  <div class="marginContent">
    <div class="contentWidth">
      <div class="articleList">
        <div class="articleListHeader">
          <h1>My Article List</h1>
          <button class="listRefreshBtn" @click="refreshList">
            <svg viewBox="0 0 24 24">
              <path
                d="M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z"
              />
            </svg>
          </button>
        </div>

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
                  <img
                    @click="that.articleLinkClickEvent(info.id,info.isOpened)"
                    :src="info.headerImage"
                  />
                  <div class="listItemInfo">
                    <div class="itemHeader" :class="info.isOpened?'itemPublish':'itemPrivate'">
                      <h2
                        @click="that.articleLinkClickEvent(info.id,info.isOpened)"
                      >{{info.articleHeader}}</h2>
                    </div>
                    <!-- <p>{{info.id}}</p> -->
                    <!-- <p>{{info.isOpened}}</p> -->
                    <div class="itemDatetime">
                      <p>{{'Last Edit : '+info.lastEditDT}}</p>
                      <p>{{'Post : '+info.postDT}}</p>
                    </div>
                    <!-- <p>{{}}</p> -->
                  </div>
                </div>
                <div class="itemEdit">
                  <button class="edit-delete" @click="that.deleteArticle(info.id)">Delete</button>
                  <button class="edit-edit" @click="that.articleLinkClickEvent(info.id,false)">Edit</button>
                  <button
                    class="edit-setStatus"
                    :class="!info.isOpened?'edit-Publish':'edit-private'"
                    @click="that.setArticleStatus(info.id,!info.isOpened)"
                  >{{info.isOpened?'Set Private':'Set Publish'}}</button>
                </div>
              </div>
            </inViewportItem>

            <div class="endLine" v-if="that.isFetchTheEndArticlesInfo">End of line...</div>
          </div>
        </itemInViewportList>
      </div>
    </div>
    <!-- <inViewportItem v-for="(info) in articlesInfo" :key="info.id" inline-template>
      <div class="testItem">asdaaaasd</div>
    </inViewportItem>-->
  </div>
</template>

<script>
// import isElementInViewport from "../../reference/elementInViewport";
import inViewportItem from "../../components/itemInViewportList/inViewportItem";
import itemInViewportList from "../../components/itemInViewportList";
// import axios from "axios";
import sywekAxios from "../../reference/axiosMsgReaction";
import Vue from "vue";
export default {
  name: "myArticles",
  components: { itemInViewportList, inViewportItem },
  data() {
    return {
      articlesInfo: [],
      isFetchTheEndArticlesInfo: false,
      fetchCount: 3,
      fetchOffset: 0,
      isFetching: false,
      rules: [],
    };
  },
  methods: {
    articleLinkClickEvent(articleId, gotoPublishPage) {
      gotoPublishPage
        ? this.$router.push(`/article/@${articleId}`)
        : this.$router.push(`/editArticle/${articleId}`);
    },
    async setArticleStatus(_articleId, articleStatus) {
      let _data = await sywekAxios.patch(
        process.env.VUE_APP_API_URL + `/article/edit/${_articleId}`,
        { articleStatus: articleStatus },
        {},
        true
      );

      // console.log("test", _data);
      if (_data.msg == "Successed") {
        for (let index in this.articlesInfo) {
          if (this.articlesInfo[index].id == _data.articleId) {
            this.articlesInfo[index].isOpened = _data.articleStatus;

            break;
          }
        }
      }
    },
    async deleteArticle(_articleId) {
      let _data = await sywekAxios.delete(
        process.env.VUE_APP_API_URL + `/article/edit/${_articleId}`,
        {},
        true
      );

      if (_data.msg != "Successed") return;
      for (let index in this.articlesInfo) {
        if (this.articlesInfo[index].id == _data.articleId) {
          Vue.delete(this.articlesInfo, index);
          break;
        }
      }
    },
    async refreshList() {
      //let _count = this.fetchCount,_offset=this.fetchOffset;
      Vue.set(this, "articlesInfo", []);
      this.isFetchTheEndArticlesInfo = false;
      const _oldFetchCount = this.fetchCount;
      this.fetchCount += this.fetchOffset;
      this.fetchOffset = 0;

      await this.getArticleInfoAndSetRules();
      this.fetchCount = _oldFetchCount;
    },

    itemInViewportFunc() {
      if (this.isFetchTheEndArticlesInfo) return;
      this.getArticleInfoAndSetRules();
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
    async getArticleInfoAndSetRules() {
      if (this.isFetching || this.fetchCount <= 0) return;
      this.isFetching = true;

      let _articleInfo = await this.fetchMyArticlesInfo(
        this.fetchCount,
        this.fetchOffset
      );
      if (_articleInfo == undefined) return;

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
    async fetchMyArticlesInfo(_count, _offset) {
      if (_count <= 0 || _offset < 0) return undefined;

      let _data = await sywekAxios.get(
        process.env.VUE_APP_API_URL + "/article/articlesInfo",
        {
          params: { count: _count, offset: _offset },
        },
        true
      );

      if (_data.msg == "Successed") {
        // console.log("fetchMyArticlesInfo", _data.msg);

        return _data.articlesInfo;
      }
      // console.log("fetchMyArticlesInfo", _data.msg);
      return undefined;
    },
  },
  async mounted() {
    await this.getArticleInfoAndSetRules();

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

      await this.getArticleInfoAndSetRules();
      this.fetchCount = _oldCount;
    }
  },
};
</script>

<style>
.listRefreshBtn {
  cursor: pointer;
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
  width: 30px;
  height: 30px;
}
.listRefreshBtn > svg {
  stroke: white;
  fill: white;
}

.articleListHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.listItems {
  /* width: 500px; */
  /* margin-top: 1000px; */
  margin-top: 1rem;
  padding-top: 1rem;
  background-color: transparent;
  border-top: rgba(128, 128, 128, 0.767) solid 1px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftInfos {
  display: flex;
  flex-direction: row;
}
.leftInfos > img {
  width: 140px;
  height: 100px;
  display: block;
  margin-right: 1rem;
  cursor: pointer;
}
.listItemInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.itemHeader > h2 {
  /* width: 100px; */
  text-decoration: underline;
  transition: color 600ms;
  display: inline-block;
  cursor: pointer;
}
.itemPrivate::before {
  content: "private";
  font-size: 1rem;

  display: inline-block;
  margin-right: 0.5rem;

  color: black;
  border: rgb(221, 121, 121) solid 1px;
  border-radius: 0.5rem;
  padding: 0.1rem 0.2rem;
  background-color: rgb(221, 121, 121);
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
}
.itemPublish::before {
  content: "Publish";
  font-size: 1rem;

  display: inline-block;
  margin-right: 0.5rem;

  color: black;
  border: rgb(46, 153, 195) solid 1px;
  border-radius: 0.5rem;
  padding: 0.1rem 0.2rem;
  background-color: rgb(46, 153, 195);
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
}
.listItemInfo > div > h2:hover {
  /* text-decoration: none; */
  color: aquamarine;
}
.itemDatetime {
  display: flex;
  flex-direction: column;
  color: rgb(144, 148, 134);
}
.itemEdit {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* width: 100%; */
  /* position: relative; */
}
.itemEdit > button {
  display: inline-block;
  background-color: transparent;
  border-radius: 0.5rem;

  padding: 0.2rem 0.5rem;
  margin: 0.3rem 0;
  transition: all 600ms;
  cursor: pointer;
  /* position: absolute; */
  /* right: 0; */
  /* display: inline-block; */
}
.edit-delete {
  color: palevioletred;
  border-color: palevioletred;
}
.edit-delete:hover {
  color: black;
  border-color: palevioletred;
  background-color: palevioletred;
}
.edit-edit {
  color: lightskyblue;
  border-color: lightskyblue;
}
.edit-edit:hover {
  color: black;
  border-color: lightskyblue;
  background-color: lightskyblue;
}
.edit-Publish {
  color: rgb(46, 153, 195);
  border-color: rgb(46, 153, 195);
}
.edit-Publish:hover {
  color: black;
  background-color: rgb(46, 153, 195);
}
.edit-private {
  color: rgb(221, 121, 121);
  border-color: rgb(221, 121, 121);
}
.edit-private:hover {
  color: black;
  background-color: rgb(221, 121, 121);
}
.endLine {
  border-radius: 0.5rem;
  background-color: #333;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.3rem 0;
  margin: 0.3rem 0;
}

@media screen and (max-width: 767px) {
  .leftInfos {
    flex-direction: column;
  }
  .contentWidth {
    width: 90%;
  }
  .listItemInfo {
    text-align: center;
  }
  .leftInfos > img {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
  .listItems {
    flex-direction: column;
  }
  .itemEdit {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .itemEdit > button {
    margin: 0.5rem 1rem;
  }
}
</style>