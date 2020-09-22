<template>
  <div class="carousel-div text-dis-select">
    <div
      v-if="sliderData"
      class="carousel-slider"
      ref="sliderDiv"
      :style="{ backgroundImage: 'url(' + sliderData[carouselIndex].img + ')' }"
    >
      <button
        class="carousel-btn carousel-left btnAnimate"
        @click="changeCarouselIndex($event.target.value)"
        value="prev"
      >《</button>
      <button
        class="carousel-btn carousel-right btnAnimate"
        @click="changeCarouselIndex($event.target.value)"
        value="next"
      >》</button>
      <div class="carousel-info">
        <h1 class="carousel-title">{{sliderData[carouselIndex].title}}</h1>
        <p class="carousel-secTitle">{{sliderData[carouselIndex].secTitle}}</p>
        <button
          @mouseenter="timer_stop"
          @mouseleave="timer_reset"
          @click="$router.push('/article/@'+sliderData[carouselIndex].id)"
        >
          <span>Wathing This Article</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      carouselIndex: 0,
      autoRotateMs: 5000,
      timer_reset: undefined,
      timer_start: undefined,
      timer_stop: undefined,
      console: console,
    };
  },
  props: ["sliderData"],
  methods: {
    changeCarouselIndex(changeType, isAutoChange = false) {
      // changeType == "prev"
      //   ? this.carouselIndex > 0
      //     ? this.carouselIndex--
      //     : (this.carouselIndex = this.sliderData.length - 1)
      //   : this.carouselIndex < this.sliderData.length - 1
      //   ? this.carouselIndex++
      //   : (this.carouselIndex = 0);

      if (changeType == "prev") {
        if (this.carouselIndex > 0) this.carouselIndex--;
        else this.carouselIndex = this.sliderData.length - 1;
      } else {
        if (this.carouselIndex < this.sliderData.length - 1)
          this.carouselIndex++;
        else this.carouselIndex = 0;
      }

      if (!isAutoChange && this.timer_reset != undefined) {
        event.stopPropagation();
        this.timer_reset();
      }
    },
    _setCarouselTimer() {
      let _that = this;

      let _timer = setInterval(() => {
        _that.changeCarouselIndex("next", true);
      }, _that.autoRotateMs);
      _that.timer_stop = function () {
        clearInterval(_timer);
      };
      _that.timer_start = function () {
        _timer = setInterval(() => {
          _that.changeCarouselIndex("next", true);
        }, _that.autoRotateMs);
      };
      _that.timer_reset = function () {
        _that.timer_stop();
        _that.timer_start();
      };
    },
  },
  mounted() {
    this._setCarouselTimer();
  },

  destroyed() {
    this.timer_stop();
  },
};
</script>

<style scoped>
.carousel.div {
  width: 100%;
  height: 500px;
}
.carousel-slider {
  /* cursor: pointer; */
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  transition: background-image 600ms, background-size 300ms;
  overflow: hidden;
}
.carousel-slider:hover {
  background-size: 105% 105%;
}
.carousel-btn {
  top: 45%;
  position: absolute;

  border: none;
  font-size: 3rem;
  font-weight: 1000;
  background: transparent;
  cursor: pointer;
  outline: none;
  /* color: rgba(100, 100, 100, 0.3); */
  transition: all 600ms;

  padding: 0;
}
.carousel-btn:hover {
  color: white;
  /* background: gray; */
  animation: none;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
.carousel-left {
  left: 2%;
}
.carousel-right {
  right: 2%;
}
.carousel-info {
  position: absolute;
  background-color: rgba(33, 33, 33, 0.7);
  border-radius: 1rem;
  top: 30%;
  left: 20%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: space-around;
  width: 20rem;
  /* height: 25rem; */
}
.carousel-title {
  font-size: 2rem;
  font-weight: 600;
}
.carousel-info > button {
  background: transparent;
  color: rgb(167, 165, 165);
  font-size: 2rem;
  border-radius: 1rem;
  display: block;
  margin-top: 2rem;
  padding: 0.4rem;
  transition: all 600ms;
  cursor: pointer;
  outline: none;
}
.carousel-info > button:hover {
  color: tomato;
  border-color: tomato;
}
.carousel-secTitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 5rem;
  color: wheat;
}

.btnAnimate {
  animation: colorBlickFunc 0.9s ease infinite alternate,
    scaleAnimateFunc 1.2s ease infinite alternate;
}
@keyframes colorBlickFunc {
  from {
    color: rgba(100, 100, 100, 0.3);
  }
  to {
    color: rgba(49, 48, 48, 0.8);
  }
}
@keyframes scaleAnimateFunc {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
@media screen and (max-width: 767px) {
  .carousel-slider {
    background-size: cover;
  }
  .carousel-info {
    text-align: center;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    width: auto;
    top: 50%;
    left: 50%;
    padding: 0;
    width: 60%;
    margin-left: -30%;
    /* height: 30vh; */
    margin-top: -30vh;
    background-color: rgba(36, 36, 36, 0);
  }
  .carousel-info > button > span {
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  .carousel-slider:hover {
    background-size: cover;
  }
}
</style>