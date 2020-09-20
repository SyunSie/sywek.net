<template>
  <div>
    <!-- <main>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio molestiae saepe doloremque eos, dignissimos magnam fuga deserunt nemo molestias ratione nostrum laborum, consequuntur tempore! Adipisci iste odio fugiat dolor esse?</main> -->
    <!-- <articlePreview /> -->
    <keep-alive include="carousel">
      <carousel :sliderData="recommandSliderDatas" />
    </keep-alive>
  </div>
</template>

<script>
import axois from "axios";

import carousel from "../components/carousel";
import Vue from "vue";
export default {
  name: "Home",
  components: { carousel },
  data() {
    return {
      recommandSliderDatas: "",
      expireMinutes: 1,
    };
  },
  methods: {
    async fetchRecommandArticlesInfo() {
      // console.log("fetchRecommandArticlesInfo !");
      let _ret = await axois.get(
        process.env.VUE_APP_API_URL + "/article/recommandArticlesInfo",
        { withCredentials: true }
      );

      if (_ret.data.msg == "Successed") {
        let _sliderDatas = [];

        for (let i in _ret.data._retArticlesInfo) {
          let _data = _ret.data._retArticlesInfo[i];
          let _item = {
            img: _data.article.articleInfo.headerImage,
            id: _data.id,
            title: _data.article.articleInfo.header,
            secTitle: _data.article.articleInfo.secondHeader,
            authorInfo: _data.article.authorInfo,
          };
          _sliderDatas.push(_item);
        }
        Vue.set(this, "recommandSliderDatas", _sliderDatas);

        sessionStorage.setItem(
          "recommandSliderDatas",
          JSON.stringify({
            datetime: new Date(),
            data: _sliderDatas,
          })
        );
      } else {
        // console.log("fetchRecommandArticlesInfo error: ", _ret.data.msg);
      }
    },
  },
  mounted() {
    // console.log("home mounted");
    let _recommandInfosData = JSON.parse(
      sessionStorage.getItem("recommandSliderDatas")
    );
    let _currentDateTime = new Date();

    // if _recommandInfosData not exists or date need update(current datetime > fetch datetime + expireMinutes)
    if (
      !_recommandInfosData ||
      new Date(_recommandInfosData.datetime) <
        _currentDateTime.setMinutes(
          _currentDateTime.getMinutes() - this.expireMinutes
        )
    ) {
      // console.log("carousel fetch new data");
      this.fetchRecommandArticlesInfo();
    } else {
      // console.log("carousel slider data load from session-storage.");
      Vue.set(this, "recommandSliderDatas", _recommandInfosData.data);
    }
  },
};
</script>

<style scoped>
</style>