<template>
  <div class="contentEle_layout" ref="baseContent">
    <div
      class="content_layout"
      :class="editable?'editableRangeHover':''"
      v-if="
        contentEle.contentType == undefined || contentEle.content == undefined || contentTypeSelTools_display == true
      "
    >
      <!-- <input
        id="imgFileDialog_input"
        ref="imgFileDialog_input"
        type="file"
        accept=".jpg, .jpeg, .bmp"
      />-->
      <button
        class="btn_contentTypeToolManager"
        v-if="
          (contentEle.contentType == undefined || contentEle.content == undefined) &&
            contentTypeSelTools_display == false
        "
        @click="contentTypeSelTools_display = true"
      >+</button>
      <div v-if="contentTypeSelTools_display">
        <button
          v-for="(t,index) in elementTypes"
          :key="index"
          class="btn_contentTypeSelTools"
          :value="t"
          @click="setContentType"
        >{{t}}</button>
      </div>
    </div>

    <div class="content_layout" v-else :class="editable?'editableRangeHover':''">
      <!--content text-->
      <p
        v-if="contentEle.contentType == 'text'"
        v-bind:contentEditable="editable"
        @blur="blur_listener($event, 'text')"
        @keydown.ctrl.enter="_createContentEle"
        v-html="contentEle.content.text"
      ></p>
      <!--content image-->

      <div class="imageContent_layout" v-else-if="contentEle.contentType == 'image'">
        <figure
          class="imageContet_imageAndCpation_layout"
          v-bind:class="[contentEle.contentStyle=='left-textAround'?'imageTextAroundLeft':contentEle.contentStyle=='right-textAround'?'imageTextAroundRight':'imageFitWidth' ]"
        >
          <img
            @click="zoomImageEventFunc"
            :class="!editable?'zoomCursor':null  "
            v-bind:src="contentEle.content.imageUrl"
          />
          <figcaption
            class="imageContent_Caption"
            aria-placeholder="Figure caption..."
            v-bind:contentEditable="editable"
            @blur="blur_listener($event, 'imageCaption')"
          >{{ contentEle.content.imageCaption }}</figcaption>
        </figure>

        <p
          class="imageContent_asideText"
          aria-placeholder="..."
          v-bind:contentEditable="editable"
          @keydown.ctrl.enter="_createContentEle"
          @blur="blur_listener($event, 'text')"
          v-html="contentEle.content.text"
        ></p>
      </div>
      <!--content video-->
      <div v-if="contentEle.contentType == 'video'" class="video_layout">
        <input
          class="videoContent_input"
          type="text"
          v-if="contentEle.contentType == 'video' && contentEle.content.videoUrl == undefined"
          placeholder="Youtube video url..."
          @blur="_videoUrlFormat"
        />
        <iframe
          class="videoContent"
          v-if="contentEle.contentType == 'video' && contentEle.content.videoUrl != undefined"
          v-bind:src="contentEle.content.videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>

      <!--content section-->
      <hr v-if="contentEle.contentType == 'section'" />
      <!--content subTitle-->
      <h2
        :id="contentEle.navId"
        v-else-if="contentEle.contentType == 'subTitle'"
        v-bind:contentEditable="editable"
        @keydown.ctrl.enter="_createContentEle"
        @blur="blur_listener($event, 'text')"
        v-html="contentEle.content.text"
      ></h2>
      <!--content header-->
      <h3
        :id="contentEle.navId"
        v-else-if="contentEle.contentType == 'header'"
        v-bind:contentEditable="editable"
        @keydown.ctrl.enter="_createContentEle"
        @blur="blur_listener($event, 'text')"
        v-html="contentEle.content.text"
      ></h3>
      <!-- content code -->

      <code v-if="contentEle.contentType=='code'">
        <div class="code">
          <div
            class="codeHeader"
            v-bind:contentEditable="editable"
            @blur="blur_listener($event, 'title')"
            v-text="contentEle.content.title"
          ></div>
          <div class="codeTable">
            <table>
              <tbody>
                <tr v-for="(item,index) in contentEle.content.code" :key="index">
                  <td class="tdLine">{{index+1}}</td>
                  <td
                    class="tdCode"
                    v-bind:contentEditable="editable"
                    v-text="item"
                    @keydown="codeKeyDown($event,index)"
                    @blur="blur_listener($event, 'code',index)"
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </code>
    </div>
    <div class="contentTool_layout" v-if="editable && contentEle.contentType=='image' ">
      <div class="imageTool" v-if="contentEle.contentType=='image'">
        <button
          value="left-textAround"
          class="toolBtn"
          style="-webkit-transform: scaleX(-1); transform: scaleX(-1);"
          @click="_imageStyleSelect"
        >
          <svg viewBox="100 0 369 369" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m154.667969 117.511719h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 32.175781h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 202.84375h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 288.175781h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 373.511719h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 458.84375h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m432 192.175781h-181.332031c-20.589844 0-37.335938-16.746093-37.335938-37.332031v-117.332031c0-20.589844 16.746094-37.335938 37.335938-37.335938h181.332031c20.585938 0 37.332031 16.746094 37.332031 37.335938v117.332031c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-181.332031-160c-2.945313 0-5.335938 2.390625-5.335938 5.335938v117.332031c0 2.945312 2.390625 5.332031 5.335938 5.332031h181.332031c2.945312 0 5.332031-2.386719 5.332031-5.332031v-117.332031c0-2.945313-2.386719-5.335938-5.332031-5.335938zm0 0"
            />
            <path
              d="m229.332031 181.511719c-3.964843 0-7.957031-1.453125-11.050781-4.417969-6.378906-6.101562-6.632812-16.234375-.511719-22.632812l71.277344-74.667969c6.078125-6.355469 16.125-6.65625 22.546875-.597657l20.609375 19.390626 38.3125-40.125c5.953125-6.273438 15.832031-6.65625 22.253906-.855469l71.273438 64c6.570312 5.890625 7.125 16.023437 1.214843 22.59375-5.886718 6.570312-16.019531 7.101562-22.589843 1.214843l-59.734375-53.632812-38.570313 40.40625c-6.082031 6.359375-16.128906 6.65625-22.550781.597656l-20.605469-19.390625-60.3125 63.167969c-3.132812 3.285156-7.335937 4.949219-11.5625 4.949219zm0 0"
            />
          </svg>
        </button>
        <button value="right-textAround" class="toolBtn" @click="_imageStyleSelect">
          <svg viewBox="100 0 369 369" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m154.667969 117.511719h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 32.175781h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 202.84375h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 288.175781h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 373.511719h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 458.84375h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m432 192.175781h-181.332031c-20.589844 0-37.335938-16.746093-37.335938-37.332031v-117.332031c0-20.589844 16.746094-37.335938 37.335938-37.335938h181.332031c20.585938 0 37.332031 16.746094 37.332031 37.335938v117.332031c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-181.332031-160c-2.945313 0-5.335938 2.390625-5.335938 5.335938v117.332031c0 2.945312 2.390625 5.332031 5.335938 5.332031h181.332031c2.945312 0 5.332031-2.386719 5.332031-5.332031v-117.332031c0-2.945313-2.386719-5.335938-5.332031-5.335938zm0 0"
            />
            <path
              d="m229.332031 181.511719c-3.964843 0-7.957031-1.453125-11.050781-4.417969-6.378906-6.101562-6.632812-16.234375-.511719-22.632812l71.277344-74.667969c6.078125-6.355469 16.125-6.65625 22.546875-.597657l20.609375 19.390626 38.3125-40.125c5.953125-6.273438 15.832031-6.65625 22.253906-.855469l71.273438 64c6.570312 5.890625 7.125 16.023437 1.214843 22.59375-5.886718 6.570312-16.019531 7.101562-22.589843 1.214843l-59.734375-53.632812-38.570313 40.40625c-6.082031 6.359375-16.128906 6.65625-22.550781.597656l-20.605469-19.390625-60.3125 63.167969c-3.132812 3.285156-7.335937 4.949219-11.5625 4.949219zm0 0"
            />
          </svg>
        </button>
        <button value="imgFitWidth" class="toolBtn" @click="_imageStyleSelect">
          <svg viewBox="200 0 270 280" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m154.667969 117.511719h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 32.175781h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m154.667969 202.84375h-138.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h138.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 288.175781h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 373.511719h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m453.332031 458.84375h-437.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h437.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
            />
            <path
              d="m432 192.175781h-181.332031c-20.589844 0-37.335938-16.746093-37.335938-37.332031v-117.332031c0-20.589844 16.746094-37.335938 37.335938-37.335938h181.332031c20.585938 0 37.332031 16.746094 37.332031 37.335938v117.332031c0 20.585938-16.746093 37.332031-37.332031 37.332031zm-181.332031-160c-2.945313 0-5.335938 2.390625-5.335938 5.335938v117.332031c0 2.945312 2.390625 5.332031 5.335938 5.332031h181.332031c2.945312 0 5.332031-2.386719 5.332031-5.332031v-117.332031c0-2.945313-2.386719-5.335938-5.332031-5.335938zm0 0"
            />
            <path
              d="m229.332031 181.511719c-3.964843 0-7.957031-1.453125-11.050781-4.417969-6.378906-6.101562-6.632812-16.234375-.511719-22.632812l71.277344-74.667969c6.078125-6.355469 16.125-6.65625 22.546875-.597657l20.609375 19.390626 38.3125-40.125c5.953125-6.273438 15.832031-6.65625 22.253906-.855469l71.273438 64c6.570312 5.890625 7.125 16.023437 1.214843 22.59375-5.886718 6.570312-16.019531 7.101562-22.589843 1.214843l-59.734375-53.632812-38.570313 40.40625c-6.082031 6.359375-16.128906 6.65625-22.550781.597656l-20.605469-19.390625-60.3125 63.167969c-3.132812 3.285156-7.335937 4.949219-11.5625 4.949219zm0 0"
            />
          </svg>
        </button>
      </div>
      <!---<div class="videoTool" v-if="contentEle.contentType=='video'">
        <button value="samll">Small</button>
        <button value="middle">Middle</button>
        <button value="large">Large</button>
      </div>-->
    </div>
    <div class="contentEleTool_layout" v-if="editable">
      <button @click="_createContentEle" class="toolBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 863.2 863.2"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M863.2,14.55l-170-0.1c0,70.4-13.8,139.4-40.9,205.2c-40.5,98.6-108.399,182.1-196.3,241.6
			c-40.2,27.2-83.5,48.7-128.8,64.1V389.95L0,619.35l327.2,229.4v-146.2c79.399-20.1,155.2-54,224-100.5
			c115.7-78.2,205-188,258.399-317.6C845.1,198.05,863.2,107.25,863.2,14.55z"
              />
            </g>
          </g>
        </svg>
      </button>
      <button @click="_deleteContentEle" class="toolBtn">
        <svg width="30px" viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
          <path
            d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
          />
          <path
            d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { elementTypes } from "./elementParam";
import { searchContenteditableTag } from "../../../../reference/tagFunctions";
const { mapMutations } = createNamespacedHelpers("articleStore");
export default {
  name: "contentElement",
  data: () => {
    return {
      contentTypeSelTools_display: false,
      secondSel_display: undefined,
      setFocusOnEditTag: false,
      elementTypes: elementTypes,
      testCodeTypeData: {
        contentType: "code",
        content: {
          title: "code test",
          code: ["line 1", "line 2", "line 3", "line 4", "line 5"],
        },
      },
      setFocusInfo: {
        el: undefined,
        nodeIndex: 0,
        startOffset: 0,
      },
    };
  },
  props: ["contentEle", "sectionIndex", "contentEleIndex", "editable"],

  methods: {
    ...mapMutations([
      "updateContentEle",
      "createContentEle",
      "createSection",
      "deleteContentEle",
      "updateNav",
    ]),
    codeKeyDown(e, _index) {
      //detect if keydown the backspace and caret on head
      if (e.key == "Backspace" && _index != 0) {
        let _sel = window.getSelection();
        if (_sel.anchorOffset == 0 && _sel.focusOffset == 0) {
          console.log("asd");
          let _nextEl =
            e.target.parentElement.parentElement.childNodes[_index - 1]
              .childNodes[1];

          this.setFocusInfo.el = _nextEl;
          this.setFocusInfo.startOffset =
            this.contentEle.content.code[_index - 1].length + 1;
          this.setFocusInfo.nodeIndex = 0;

          let _delRowStr = e.target.innerText;

          this.contentEle.content.code.splice(_index, 1);
          this.contentEle.content.code[_index - 1] += " " + _delRowStr;

          this.setFocusOnEditTag = true;
          this._updateContentEle();
        }
      }
    },
    zoomImageEventFunc(e) {
      if (this.editable) return;
      // passing when img was zoom.
      let _el = e.target.parentElement;
      if (_el.classList.contains("imgZoomEvent")) return;
      event.stopPropagation();
      let _body = document.querySelector("body");
      // add zoom class
      _el.classList.add("imgZoomEvent");
      e.target.classList.add("zoom");
      //create style ,the style using for transfrom
      let _transfromStyle = document.createElement("style");
      _transfromStyle.type = "text/css";

      const _head = document.querySelector("head");
      //declare image size and other infos
      const _imageW = 800,
        _imageH = 500,
        _maxImageH = 600;
      let _margin = 20;
      _head.appendChild(_transfromStyle);
      let _scrollPass = false;
      let _resizeFunc = () => {
        // zoom image scale will fit the width
        // e1 =>  zoom image height > _maxImageH
        // e2 =>  zoom image height > _cheight

        let _cwidth = _body.clientWidth - _margin * 2;
        let _Rate = _cwidth / _imageW;
        let _cheight = _body.clientHeight - _margin * 2;

        // if zoom scale will let image-y out of viewport then change _Rate.
        if (_Rate * _imageH >= _maxImageH) {
          _Rate = _maxImageH / _imageH;
        }
        if (_Rate * _imageH >= _cheight) {
          _Rate = _cheight / _imageH;
        }
        //caculate zoom scale and traslate and change innerHTML
        _transfromStyle.innerHTML = `.zoom{transform: scale(${_Rate}) translate(${
          (_cwidth - _imageW) / 2 / _Rate + _margin / _Rate
        }px, ${(_cheight - _imageH) / 2 / _Rate + _margin / _Rate}px);}`;
        _scrollPass = false;
      };
      let _zoomBlurFunc = (_e) => {
        // pass fist time scroll.
        if (_e.type == "scroll")
          if (!_scrollPass) {
            _scrollPass = true;
            return;
          }
        _head.removeChild(_transfromStyle);
        _body.onresize = undefined;
        _el.classList.remove("imgZoomEvent");
        e.target.classList.remove("zoom");
        _body.removeEventListener("click", _zoomBlurFunc);
        _body.removeEventListener("scroll", _zoomBlurFunc);
      };

      _body.addEventListener("click", _zoomBlurFunc);
      _body.addEventListener("scroll", _zoomBlurFunc);

      _body.onresize = _resizeFunc;
      _resizeFunc();
    },
    blur_listener(e, contentType, _index = undefined) {
      if (!this.editable) return;

      if (contentType == "text") {
        //add text vaildation here...  remove other tag

        //<[^>]*>
        this.contentEle.content.text = e.target.innerText
          .replace(/<[^>]*>/, "")
          .replace(/(?:\r\n|\r|\n)/g, "<br>");

        //this.$forceUpdate();
      } else if (contentType == "imageCaption") {
        this.contentEle.content.imageCaption = e.target.innerText
          .replace()
          .replace(/<[^>]*>/, "")
          .replace(/(?:\r\n|\r|\n)/g, " ");
      } else if (contentType == "code") {
        let _code = e.target.innerText.split(/(?:\r\n|\r|\n)/g);

        if (_index >= this.contentEle.content.code.length) return;

        this.contentEle.content.code.splice(_index, 1);
        _code.map((v, i) => {
          this.contentEle.content.code.splice(_index + i, 0, v);
        });
      } else if (contentType == "title") {
        this.contentEle.content.title = e.target.innerText
          .replace(/<[^>]*>/, "")
          .replace(/(?:\r\n|\r|\n)/g, " ");
        console.log(this.contentEle.content.title);
      }
      this._updateContentEle();
    },
    async setContentType(e) {
      if (!this.editable) return;

      let contentType = e.target.value;

      //contentType step
      if (contentType == "image") {
        // let el = this.$refs.imgFileDialog_input;
        let el = document.getElementById("imgFileDialog_input");
        //using promise ,waitting img->base64 process done.
        let readImgPromise = new Promise((resolve, reject) => {
          el.addEventListener("change", (e) => {
            if (e.target.files != undefined) {
              let _reader = new FileReader();
              _reader.onload = (e) => {
                resolve(e.target.result);
              };
              _reader.readAsDataURL(e.target.files[0]);
            } else {
              reject();
            }
          });
        });

        //show file select dialog
        el.click();

        this.contentEle.content.imageUrl = await readImgPromise;
      }

      this.contentEle.contentType = contentType;
      this.contentTypeSelTools_display = false;
      this.setFocusOnEditTag = true;

      this.setFocusInfo.el = this.$refs.baseContent;
      this.setFocusInfo.startOffset = 0;
      this.setFocusInfo.nodeIndex = undefined;

      this._updateContentEle();

      if (contentType == "section") {
        this._createSection();
      }
      if (contentType == "code") {
        this.contentEle.content.code = [""];
        this.contentEle.content.title = "";
      }
      if (
        contentType == "section" ||
        contentType == "header" ||
        contentType == "subTitle"
      ) {
        this.updateNav();
      }
    },
    _createContentEle() {
      if (!this.editable) return;

      this.createContentEle({
        sectionIndex: this.sectionIndex,
        contentEleIndex: this.contentEleIndex,
      });
    },
    _updateContentEle() {
      if (!this.editable) return;

      this.updateContentEle({
        contentEle: this.contentEle,
        sectionIndex: this.sectionIndex,
        contentEleIndex: this.contentEleIndex,
      });
    },
    _deleteContentEle() {
      if (!this.editable) return;

      //let needUpdate = this.contenteEle == undefined ? true : false;
      this.deleteContentEle({
        sectionIndex: this.sectionIndex,
        contentEleIndex: this.contentEleIndex,
      });
      //this.contentTypeSelTools_display = false; // 不將button 收回 會沒辦法update contentEle
      //if (needUpdate) this.$forceUpdate();
    },
    _setFocus(el, childIndex, offset = 0) {
      if (!this.editable) return;
      let _tag = searchContenteditableTag(el);

      _tag = childIndex != undefined ? _tag.childNodes[childIndex] : _tag;

      if (!_tag) return;

      let range = document.createRange();
      let sel = window.getSelection();

      range.setStart(_tag, offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    },

    _createSection() {
      if (!this.editable) return;

      this.createSection({
        baseSectionIndex: this.sectionIndex,
        baseContentEleIndex: this.contentEleIndex,
      });

      /* this.createContentEle({
        sectionIndex: this.sectionIndex + 1,
        contentEleIndex: 0
      });*/
    },
    _videoUrlFormat(e) {
      if (!this.editable) return;

      let videoUrlStr = e.target.value;

      if (!videoUrlStr.includes("www.youtube.com")) return;
      if (videoUrlStr.includes("/embed/")) {
        this.contentEle.content = {
          videoUrl: videoUrlStr,
        };
        //this.contentEle.content.videoUrl = videoUrlStr;
      } else if (videoUrlStr.includes("watch?v=")) {
        let urlStrs = videoUrlStr.split("watch?v=");

        if (urlStrs.length < 2) return;

        this.contentEle.content = {
          videoUrl: "https://www.youtube.com/embed/" + urlStrs[1],
        };
      } else return;

      this._updateContentEle();

      //this.$forceUpdate(); //有確實用mutation 且兩個vuex snapshot 確實有偵測到更改 但是沒有update data 若將 this.contentEle.content.contentType ='video2' 則會更新 目前先使用forceupdate強制更新
    },
    _imageStyleSelect(e) {
      if (!this.editable) return;

      this.contentEle.contentStyle = e.target.value;
      this._updateContentEle();
      //this.$forceUpdate();
    },
  },

  updated() {
    if (!this.editable) return;

    if (!this.setFocusOnEditTag) return;

    this._setFocus(
      this.setFocusInfo.el,
      this.setFocusInfo.nodeIndex,
      this.setFocusInfo.startOffset
    );
    this.setFocusOnEditTag = false;
  },
};
</script>

<style scoped>
/* contentEle_Layout*/
.contentEle_layout {
  margin: 0px auto;
  position: relative;
}
.contentEleTool_layout {
  position: absolute;
  right: 0;
  bottom: 0;
  display: none;
}
.contentEle_layout:hover .contentEleTool_layout,
.contentEle_layout:focus-within .contentEleTool_layout {
  display: block;
}

/* content_layout*/
.content_layout h2,
h3 {
  font-weight: 500;
}
.content_layout {
  margin: 2rem 0;
  padding: 0;
  font-size: 1.5rem;
  min-height: 1.6rem;
}

.content_layout * {
  margin: 0;
}
.content_layout hr {
  width: 75%;
  border-color: rgba(222, 222, 222, 0.9);
  border-style: dashed;
  margin: 0 auto;
}
/* video content*/

.videoContent_input {
  width: 100%;
  height: 100%;
  font: inherit;
  border-radius: 0.6rem;
}
.videoContent html {
  width: 100%;
  height: 100%;
}
.videoContent {
  width: 95%;
  height: 450px;
}
.video_layout {
  text-align: center;
}
/*image content */
.imageTextAroundLeft {
  float: left;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.imageTextAroundRight {
  float: right;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.imageTextAroundLeft img,
.imageTextAroundRight img {
  width: 80%;
}

.imageFitWidth {
  float: unset;
}
.imageFitWidth img {
  width: 100%;
}
/* #imgFileDialog_input {
  display: none;
  width: 0;
  height: 0;
} */
.imageContet_imageAndCpation_layout img {
  /* min-width: 400px; */
  max-height: 500px;
  text-align: left;
  background-color: #aaa;
  border-color: transparent;
  object-fit: fill;
}
.imageContent_layout {
  overflow: hidden;
}

.imageContent_Caption {
  text-align: center;
  margin-top: 0;
  font-size: 0.8rem;
  color: #777;
}
.imageContent_asideText {
  width: 100%;
}
/*btn_comtentTypeSelTools */
.btn_contentTypeSelTools {
  margin: 0 0.2rem;
  border-radius: 1.2rem 0.1rem;
  padding: 0.2rem 0.6rem;
}
/*Content Tool class */
.contentTool_layout {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  z-index: 2;
}
.content_layout:focus-within ~ .contentTool_layout,
.content_layout:hover ~ .contentTool_layout,
.contentTool_layout:hover {
  display: block;
}

button {
  font-size: 1.15rem;
  background-color: #181a1b;
  color: #fff;
}

[contentEditable="true"]:empty:not(:focus):not(td):before {
  content: "type somthing...";
  color: #aa8;
}
/*toolBtn */
.toolBtn {
  outline: none;
  width: 1.7em;
  height: 1.7rem;
  border-radius: 0.3rem;
  cursor: pointer;
  padding: 0;
  margin: 0.1rem;
}
.toolBtn svg {
  fill: whitesmoke;
  margin: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.zoomCursor {
  cursor: zoom-in;
}
.imgZoomEvent > img {
  cursor: zoom-out !important;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 800px !important;
  height: 500px !important;

  transition: transform 200ms;
  z-index: 1200;
}
.imgZoomEvent::after {
  display: block;
  content: "";
  position: fixed;
  z-index: 1199;
  background-color: rgba(33, 33, 33, 0.98);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  filter: blur(1px);
}
.code {
  border-radius: 1rem;
  border: #333 solid 1px;
  background-color: rgba(17, 17, 17, 0.76);
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 1rem;
}
.codeHeader {
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
  font-size: 1rem;
  border-bottom: #333 solid 1px;
  padding: 0.5rem 0;
  padding-left: 1rem;
  outline: none;
}
.tdLine {
  /* font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif; */
  font-size: 0.8rem;
  width: 2rem;
  text-align: right;
  padding: 0.3rem 1rem;
  color: #555;
}
.tdCode {
  padding-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  min-width: 400px;
}

@media screen {
}
</style>
