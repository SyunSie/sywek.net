import axios from "axios";
import router from "../route";
function _sywekAxiosMsgReactions(apiType, msg) {
  if (msg == "Not login.") {
    router.push("/");
  }

  console.log(apiType, " : ", msg);
}

const sywekAxios = {
  get: async (url, config = {}, withCredentials = false) => {
    withCredentials ? (config.withCredentials = true) : (config.withCredentials = false);
    // run porcessbar
    let _ret = await axios.get(url, config);

    // console.log(_ret);
    _sywekAxiosMsgReactions(_ret.data.type, _ret.data.msg);
    //close processbar
    return _ret.data;
  },
  delete: async (url, config = {}, withCredentials = false) => {
    withCredentials ? (config.withCredentials = true) : (config.withCredentials = false);
    // run porcessbar
    let _ret = await axios.delete(url, config);

    _sywekAxiosMsgReactions(_ret.data.type, _ret.data.msg);

    return _ret.data;
    //close processbar
  },
  post: async (url, data, config = {}, withCredentials = false) => {
    withCredentials ? (config.withCredentials = true) : (config.withCredentials = false);
    // run porcessbar
    let _ret = await axios.post(url, data, config);

    _sywekAxiosMsgReactions(_ret.data.type, _ret.data.msg);
    return _ret.data;
    //close processbar
  },
  put: async (url, data, config = {}, withCredentials = false) => {
    withCredentials ? (config.withCredentials = true) : (config.withCredentials = false);
    // run porcessbar
    let _ret = await axios.put(url, data, config);

    _sywekAxiosMsgReactions(_ret.data.type, _ret.data.msg);

    return _ret.data;
    //close processbar
  },
  patch: async (url, data, config = {}, withCredentials = false) => {
    withCredentials ? (config.withCredentials = true) : (config.withCredentials = false);
    // run porcessbar
    let _ret = await axios.patch(url, data, config);

    _sywekAxiosMsgReactions(_ret.data.type, _ret.data.msg);
    return _ret.data;
    //close processbar
  },
};

export default sywekAxios;
