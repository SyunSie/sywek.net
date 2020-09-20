<template>
  <div class="authorDiv">
    <div class="authorImgDiv">
      <img :src="authorInfo.authorPicture" />
    </div>
    <div class="authorInfoDiv">
      <div class="authorInfoTop">
        <h1 class="authorName">{{authorInfo.authorName}}</h1>
        <button
          @click="setFollowing(authorInfo.authorId , !readerInfo.isFollowing)"
          class="followBtn"
          v-bind:class="readerInfo.isFollowing ? 'readerFollowing' : ''"
        >{{readerInfo.isFollowing ? "Follwing" : "Follow"}}</button>
      </div>
      <div v-if="authorInfo.links" class="authorInfoBottom">
        <button v-if="authorInfo.links.facebook !=''" value="facebook" @click="authorLinkClick">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1850 1850">
            <path
              class="svg-itemColor"
              d="M1376 128q119 0 203.5 84.5t84.5 203.5v960q0 119-84.5 203.5t-203.5 84.5h-188v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-532q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960z"
            />
          </svg>
        </button>
        <button v-if="authorInfo.links.twitter !=''" value="twitter" @click="authorLinkClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            viewBox="0 0 6.82666 6.82666"
          >
            <g id="Layer_x0020_1">
              <rect class="svg-bgColor" width="6.82667" height="6.82667" rx="1.45635" ry="1.45635" />
              <path
                class="svg-itemColor"
                d="M5.49009 2.3776c-0.147055,0.065189 -0.305406,0.109406 -0.47126,0.129142 0.169453,-0.101665 0.299421,-0.262402 0.361008,-0.453976 -0.158654,0.0938819 -0.334398,0.16228 -0.521224,0.199079 -0.149701,-0.159587 -0.363071,-0.259126 -0.599165,-0.259126 -0.45337,0 -0.820579,0.367598 -0.820579,0.820579 0,0.0642559 0.00711024,0.127079 0.021185,0.187126 -0.681961,-0.0343504 -1.28679,-0.361028 -1.69143,-0.857681 -0.0708268,0.121335 -0.111138,0.262335 -0.111138,0.412661 0,0.284827 0.144882,0.536122 0.364846,0.683177 -0.1345,-0.00420866 -0.260886,-0.041248 -0.371744,-0.102835 0,0.00359843 0,0.0068937 0,0.0104961 0,0.397437 0.28298,0.72915 0.658323,0.804508 -0.0687008,0.0188228 -0.141303,0.0289921 -0.216055,0.0289921 -0.0528504,0 -0.104268,-0.00511811 -0.154535,-0.0146811 0.104657,0.326051 0.407697,0.563295 0.766882,0.569866 -0.280921,0.220244 -0.634752,0.351142 -1.01935,0.351142 -0.0664016,0 -0.131807,-0.00357874 -0.19576,-0.0113228 0.363091,0.232799 0.794343,0.368748 1.2578,0.368748 1.5095,0 2.3352,-1.25067 2.3352,-2.33511 0,-0.035563 -0.000909449,-0.0708465 -0.00236614,-0.10611 0.160413,-0.115673 0.299421,-0.260276 0.40937,-0.424677z"
              />
            </g>
          </svg>
        </button>
        <button v-if="authorInfo.links.instagram !=''" value="instagram" @click="authorLinkClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 28.87 28.87"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <rect
                  width="28.87"
                  height="28.87"
                  rx="6.48"
                  ry="6.48"
                  fill="url(#linear-gradient)"
                />
                <g>
                  <path
                    class="svg-itemColor"
                    d="M10 5h9c.2.1.5.1.7.2a4.78 4.78 0 0 1 3.8 3.3 8 8 0 0 1 .3 1.5v8.8a6.94 6.94 0 0 1-1.2 3.1 5.51 5.51 0 0 1-4.5 1.9h-7.5a5.49 5.49 0 0 1-3.7-1.2A5.51 5.51 0 0 1 5 18.14v-7a7.57 7.57 0 0 1 .1-1.5 4.9 4.9 0 0 1 3.8-4.3zm-3.1 9.5v3.9a3.42 3.42 0 0 0 3.7 3.7q3.9.15 7.8 0c2.3 0 3.6-1.4 3.7-3.7q.15-3.9 0-7.8a3.52 3.52 0 0 0-3.7-3.7q-3.9-.15-7.8 0a3.42 3.42 0 0 0-3.7 3.7z"
                  />
                  <path
                    class="svg-itemColor"
                    d="M9.64 14.54a4.91 4.91 0 0 1 4.9-4.9 5 5 0 0 1 4.9 4.9 4.91 4.91 0 0 1-4.9 4.9 5 5 0 0 1-4.9-4.9zm4.9-3.1a3.05 3.05 0 1 0 3 3 3 3 0 0 0-3-3z"
                  />
                  <path
                    class="svg-itemColor"
                    d="M18.34 9.44a1.16 1.16 0 0 1 1.2-1.2 1.29 1.29 0 0 1 1.2 1.2 1.2 1.2 0 0 1-2.4 0z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button v-if="authorInfo.links.github !=''" value="github" @click="authorLinkClick">
          <svg
            class="svg-itemColor"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 470 470"
            xml:space="preserve"
          >
            <g>
              <path
                d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906C438.536,184.851,428.728,148.168,409.132,114.573z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import sywekAxios from "../../reference/axiosMsgReaction";
export default {
  name: "authorCard",
  props: ["authorInfo", "readerInfo"],
  methods: {
    authorLinkClick(e) {
      // open new tab and direct

      let _url = this.authorInfo.links[e.target.value];
      window.open(_url, "_blank");
    },
    async setFollowing(targetUserId, followStatus) {
      let _apiPath =
        process.env.VUE_APP_API_URL + `/user/follow/${targetUserId}`;
      let _data = followStatus
        ? await sywekAxios.post(_apiPath, {}, {}, true)
        : await sywekAxios.delete(_apiPath, {}, true);

      if (_data.msg == "Successed") {
        this.readerInfo.isFollowing = _data.currentStatus;
      }
    },
  },
};
</script>

<style scoped>
.authorDiv {
  border-radius: 1rem;
  /* background-color: #333; */
  padding: 1rem;
}
.authorInfoDiv {
  margin-left: 1rem;
}
.authorImgDiv > img {
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  /* float: left; */
  shape-outside: circle();
  margin-right: 0.3rem;
}
.followBtn {
  cursor: pointer;
  margin-left: 1rem;
  font-weight: 500;
  height: 1.2rem;
  background-color: transparent;
  border-color: orange;
  color: orange;
  border-radius: 0.2rem;
  outline: none;
}
.readerFollowing {
  background-color: orange;
  font-weight: 700;
  color: black;
}
.authorInfoTop {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.authorDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.authorInfoBottom {
  margin-top: 1rem;
}
.authorInfoBottom > button {
  padding: 0;
  width: 30px;
  height: 30px;
  margin: 0.5rem 0.2rem;
  background-color: black;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
}
.authorInfoBottom > button > svg {
  width: 100%;
  margin: 0;
  pointer-events: none;
}
.svg-bgColor {
  fill: transparent;
}
.svg-itemColor {
  fill: whitesmoke;
}
</style>