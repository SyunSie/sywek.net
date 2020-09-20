<template>
  <div ref="loginOutside" class="login-outside" @click="exitClick">
    <div class="login-form">
      <div class="exit-div">
        <button @click="$emit('login-exit')" class="exit-btn">X</button>
      </div>
      <h1 class="login-header">Log In</h1>
      <hr />
      <div class="login-content">
        <input
          @focus="inputFoucs"
          @keyup.enter="loginClick"
          v-model="account"
          type="text"
          size="25"
          maxlength="128"
          key="account"
          ref="account"
          placeholder="Account (email)"
        />
        <input
          @focus="inputFoucs"
          @keyup.enter="loginClick"
          v-model="password"
          type="password"
          size="25"
          maxlength="32"
          key="password"
          ref="password"
          placeholder="Password"
        />
      </div>
      <hr class="or-hr" />
      <div class="login-other">
        <button value="google">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 262"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
        </button>
        <button value="facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
            version="1.1"
            width="32"
            height="32"
          >
            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                <path
                  d="M225.638 208H202.65a2.65 2.65 0 0 1-2.649-2.65v-42.7a2.649 2.649 0 0 1 2.65-2.65h42.701a2.649 2.649 0 0 1 2.649 2.65v42.7a2.65 2.65 0 0 1-2.649 2.65h-12.232v-18.588h6.24l.934-7.244h-7.174v-4.625c0-2.098.583-3.527 3.59-3.527l3.836-.002v-6.479c-.663-.088-2.94-.285-5.59-.285-5.53 0-9.317 3.376-9.317 9.575v5.343h-6.255v7.244h6.255V208z"
                />
              </g>
            </g>
          </svg>
        </button>
        <button value="twitter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="124.444 2.081 589 589"
          >
            <circle cx="420.944" cy="296.781" r="294.5" fill="#2daae1" />
            <path
              d="M609.773 179.634c-13.891 6.164-28.811 10.331-44.498 12.204 16.01-9.587 28.275-24.779 34.066-42.86a154.78 154.78 0 0 1-49.209 18.801c-14.125-15.056-34.267-24.456-56.551-24.456-42.773 0-77.462 34.675-77.462 77.473 0 6.064.683 11.98 1.996 17.66-64.389-3.236-121.474-34.079-159.684-80.945-6.672 11.446-10.491 24.754-10.491 38.953 0 26.875 13.679 50.587 34.464 64.477a77.122 77.122 0 0 1-35.097-9.686v.979c0 37.54 26.701 68.842 62.145 75.961-6.511 1.784-13.344 2.716-20.413 2.716-4.998 0-9.847-.473-14.584-1.364 9.859 30.769 38.471 53.166 72.363 53.799-26.515 20.785-59.925 33.175-96.212 33.175-6.25 0-12.427-.373-18.491-1.104 34.291 21.988 75.006 34.824 118.759 34.824 142.496 0 220.428-118.052 220.428-220.428 0-3.361-.074-6.697-.236-10.021a157.855 157.855 0 0 0 38.707-40.158z"
              fill="#fff"
            />>
          </svg>
        </button>
        <button value="github">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="36"
            height="36"
            viewBox="0 0 440 440"
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
      <div class="login-footer">
        <button class="login-btn" @click="loginClick">Login ></button>
        <p ref="msg" class="warningText"></p>
        <router-link
          class="login-signup"
          v-on:click.native="$emit('login-exit')"
          to="/signup"
        >Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import sywekAxios from "../../reference/axiosMsgReaction";
export default {
  name: "logIn",
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    inputFoucs() {
      this.$refs.msg.innerText = "";
    },
    exitClick(e) {
      if (e.target != this.$refs.loginOutside) return;

      this.$emit("login-exit");
    },
    async loginClick() {
      // verify account and password
      let userdata = {
        account: this.account,
        password: this.password,
      };

      let _data = await sywekAxios.post(
        process.env.VUE_APP_API_URL + "/session",
        {
          userData: userdata,
        },
        {},
        true
      );
      3, _data;
      //successed => exit and set token
      //failed show error msg

      if (_data.msg == "Successed") {
        if (_data.token != null) {
          localStorage.userInfo = JSON.stringify(_data.token);
          this.$router.push("/").catch(() => {});
        }
        //emit userInfo update.
        this.$emit("updateUserInfo");
        //send update to vuejs.app
        this.$emit("login-exit");
      } else {
        this.$refs.msg.innerText = _data.msg;
      }
    },
  },
  mounted() {
    this.$refs.account.focus();
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
  outline: none;
}
.login-outside {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.login-form {
  position: absolute;
  background-color: #333;
  margin-top: -17.5rem;
  top: 50vh;
  left: 50%;
  margin-left: -12.5rem;
  width: 25rem;
  height: 35rem;
  border-radius: 1rem;
  text-align: center;

  border-color: #aaa;
  border-style: outset;
  border-width: 1px;
  z-index: 1002;
}
.login-header {
  margin: 1rem auto;
}
.login-header > h1 {
  font-family: "Times New Roman", Times, serif;
}
.exit-div {
  text-align: right;
}
.exit-btn {
  border-radius: 2rem 2rem;
  width: 2rem;
  height: 2rem;
  color: #aaa;
  border-style: none;
  background-color: transparent;
  transition: all 600ms;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0.5rem;
}
.exit-btn:hover {
  border-radius: 0.4rem 0.4rem;
  color: #eee;
}

.login-content > input {
  display: block;
  margin: 2rem auto;
  font-size: 1.1rem;
  color: #ddd;
  background-color: transparent;
  border-radius: 0.5rem;
  outline: none;
  padding: 0.6rem 0.7rem;
}
hr {
  width: 60%;
  border: none;
  border-top: dotted;
  border-width: 2px;
}

.login-other {
}
.login-other > button {
  width: 3rem;
  height: 3rem;
  margin: 1rem 0.3rem;
  background: transparent;
  border-style: none;
}

.or-hr {
  overflow: visible;
  margin: 0 auto;
}
.or-hr::after {
  content: "or";
  position: relative;
  top: -1rem;
  font-size: 1.3rem;
  background-color: #333;
  padding: 0 0.5rem;
}

.login-btn {
  width: 10rem;
  height: 2rem;
  font-size: 1.3rem;
  border-radius: 0.5rem;
  color: #ccc;
  transition: all 330ms;
  background-color: #444;
}
.login-btn:hover {
  color: black;
  background-color: yellowgreen;
}
.login-signup {
  display: block;
  color: #eee;
  margin-top: 1rem;
}
.warningText {
  height: 1.3rem;
  color: red;
  font-size: 1.1rem;
}
</style>