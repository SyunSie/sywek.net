<template>
  <div>
    <imageBase64Reader ref="imageReader" />

    <div class="input_form">
      <div>
        <h1>{{!isReviseMode?"Sign Up":`${name} 's profile`}}</h1>
        <div class="userImage">
          <button v-if="!userImage" @click="appendUserImage">Append User Image</button>
          <img v-if="userImage" @click="appendUserImage" :src="userImage" />
        </div>
        <div v-if="!isReviseMode" class="input-div">
          <input
            type="text"
            v-model="account"
            key="account"
            ref="account"
            placeholder="Account(email)"
            maxlength="128"
          />
          <hr />
        </div>
        <div v-if="!isReviseMode" class="input-div">
          <input
            type="password"
            v-model="password"
            key="password"
            ref="password"
            placeholder="Password [8-32 chars]"
            maxlength="32"
          />
          <hr />
        </div>
        <div v-if="!isReviseMode" class="input-div">
          <input
            type="text"
            v-model="name"
            key="name"
            ref="name"
            placeholder="Uesr Name [3-64 chars]"
            maxlength="64"
          />
          <hr />
        </div>
      </div>
      <div>
        <h3>
          Social Media
          <sup>(*optional)</sup>
        </h3>

        <div class="input-div">
          <input
            type="text"
            v-model="facebook"
            key="facebook"
            ref="facebook"
            placeholder="Facebook Url"
          />
          <hr />
        </div>
        <div class="input-div">
          <input
            type="text"
            v-model="instagram"
            key="instagram"
            ref="instagram"
            placeholder="Instagram Url"
          />
          <hr />
        </div>
        <div class="input-div">
          <input type="text" v-model="github" key="github" ref="github" placeholder="Github Url" />
          <hr />
        </div>
        <div class="input-div">
          <input
            type="text"
            v-model="twitter"
            key="twitter"
            ref="twitter"
            placeholder="Twitter Url"
          />
          <hr />
        </div>
      </div>
      <p ref="msg" class="msg"></p>
      <button @click="signUpCommit">{{!isReviseMode?"Create Account":"Update Profile"}}</button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import sywekAxios from "../../reference/axiosMsgReaction";
import asyncTimer from "../../reference/asyncTimer";
import imageBase64Reader from "../imageBase64Reader";
export default {
  name: "signUpForm",
  components: { imageBase64Reader },
  props: ["userProfile"],
  data() {
    return {
      account: "",
      password: "",
      name: "",
      userImage: "",
      facebook: "",
      twitter: "",
      github: "",
      instagram: "",

      isReviseMode: false,
      userId: 0,
    };
  },
  methods: {
    async appendUserImage() {
      let _imageSize = Number(process.env.VUE_APP_USER_IMG_SIZE_MB);
      let _ret = await this.$refs.imageReader.imageReaderFunc(_imageSize);

      this.userImage = await _ret;
    },
    async signUpCommit() {
      this.$refs.msg.classList.remove("msg-successed");
      this.$refs.msg.classList.remove("msg-invalide");
      this.$refs.msg.innerText = "";
      // check input data.
      let _invalideEles = [];

      if (
        !this.isReviseMode &&
        this.account.match(
          /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g
        ) != this.account
      ) {
        // this.$refs.account.parentElement.classList.add("invalid-div");
        _invalideEles.splice(_invalideEles.length, 0, this.$refs.account);
      }

      if (
        !this.isReviseMode &&
        this.password.match(/[A-Za-z0-9@#$%^&+=]{8,32}/g) != this.password
      ) {
        _invalideEles.splice(_invalideEles.length, 0, this.$refs.password);
      }

      if (
        !this.isReviseMode &&
        this.name.match(/[a-z0-9A-Z ]{3,64}/g) != this.name
      ) {
        _invalideEles.splice(_invalideEles.length, 0, this.$refs.name);
      }

      if (this.facebook != "")
        if (this.facebook.search("https://www.facebook.com/") != 0) {
          _invalideEles.splice(_invalideEles.length, 0, this.$refs.facebook);
        }

      if (this.instagram != "")
        if (this.instagram.search("https://www.instagram.com/") != 0) {
          _invalideEles.splice(_invalideEles.length, 0, this.$refs.instagram);
        }

      if (this.github != "")
        if (this.github.search("https://github.com/") != 0) {
          _invalideEles.splice(_invalideEles.length, 0, this.$refs.github);
        }

      if (this.twitter != "")
        if (this.twitter.search("https://twitter.com/") != 0) {
          _invalideEles.splice(_invalideEles.length, 0, this.$refs.twitter);
        }

      if (_invalideEles.length != 0) {
        _invalideEles.forEach((ele) => {
          let _innerFunc = () => {
            ele.parentElement.classList.remove("invalide-div");
            ele.removeEventListener("focus", _innerFunc);
          };

          ele.addEventListener("focus", _innerFunc);

          ele.parentElement.classList.add("invalide-div");
        });
        return;
      }

      let _data = undefined;
      if (this.isReviseMode) {
        let userdata = {
          userImage: this.userImage,
          socialInfo: {
            facebook: this.facebook,
            instagram: this.instagram,
            twitter: this.twitter,
            github: this.github,
          },
        };

        _data = await sywekAxios.post(
          process.env.VUE_APP_API_URL + "/user/profile",
          {
            userProfileData: userdata,
          },
          {},
          true
        );
      } else {
        let userdata = {
          account: this.account,
          password: this.password,
          userImage: this.userImage,
          name: this.name,
          socialInfo: {
            facebook: this.facebook,
            instagram: this.instagram,
            twitter: this.twitter,
            github: this.github,
          },
        };

        _data = await sywekAxios.post(process.env.VUE_APP_API_URL + "/user", {
          userData: userdata,
        });
      }

      if (_data.msg == "Successed") {
        // let _asyncTimer = (msec) => {
        //   return new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve(msec);
        //     }, msec);
        //   });
        // };
        if (!this.isReviseMode)
          this.$refs.msg.innerText =
            "Sign Up successed , will redirect 2sec later.";
        else
          this.$refs.msg.innerText =
            "Update profile successed , will redirect 2sec later.";
        this.$refs.msg.classList.add("msg-successed");
        await asyncTimer(2000); //async timer

        this.$router.push({ name: "home" }); //redirect to home.
      } else {
        this.$refs.msg.innerText = _data.msg;
        this.$refs.msg.classList.add("msg-invalide");
      }
    },
  },
  watch: {
    userProfile: function _(newValue) {
      if (newValue != undefined) {
        this.isReviseMode = true;
        this.name = newValue.name;
        this.userId = newValue.id;
        // this.socialInfo = newValue.socialInfo;

        this.userImage = newValue.userImage;

        this.twitter = newValue.socialInfo.twitter;
        this.facebook = newValue.socialInfo.facebook;
        this.github = newValue.socialInfo.github;
        this.instagram = newValue.socialInfo.instagram;
      }
    },
  },
};
</script>

<style scoped>
.userImage > button {
  background-color: #333;
  color: #999;
  border: #aaa dashed 2px;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  font-size: 1.3rem;
  padding: 0.3rem;
  shape-outside: circle();
  cursor: pointer;
  transition: all 0.6s;
}
.userImage > button:hover {
  border-color: lightskyblue;
  color: rgb(113, 164, 216);
}
.userImage > img {
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  /* float: left; */
  shape-outside: circle();
  margin: 2rem auto;
  cursor: pointer;
}
.input_form {
  text-align: center;

  max-width: 30rem;
  width: 90%;
  margin: 0.5rem auto;
  font-size: 1.2rem;
  border-radius: 1rem;

  padding: 1rem;
  background-color: #333;
  font-family: "Times New Roman", Times, serif;
}
hr {
  border-style: solid;
  opacity: 20%;
  width: 90%;
  margin-top: 0.2rem;
}
input {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  margin: 0.3rem 0;
  padding-left: 0.5rem;
  width: 90%;
  outline: none;
  color: white;
  background-color: transparent;
  border-color: transparent;
}
.input-div {
  border-color: transparent;
  border-width: 2px;
  border-style: dotted;
  border-radius: 1rem;
  transition: all 300ms;
  margin-top: 0.5rem;
}
.invalide-div {
  border-color: red;
}
button {
  border: greenyellow;
  border-style: double;
  font-size: 1.5rem;
  padding: 0.5rem, 0.7rem;
  outline: none;
  margin: 1rem;
  transition: all 300ms;
  border-radius: 0.5rem;
  font-weight: 500;

  background-color: yellowgreen;
  color: black;
}
button:hover {
  color: whitesmoke;
  background-color: transparent;
}

.msg {
  /* display: none; */
  height: 1.3rem;
  margin: 0.1rem auto;
  font-size: 1.1rem;
  /* opacity: 90%; */
  transition: all 300ms;
}
.msg-invalide {
  display: block;
  color: red;
}
.msg-successed {
  display: block;
  color: greenyellow;
}
</style>