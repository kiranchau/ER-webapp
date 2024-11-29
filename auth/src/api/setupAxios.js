import axios from "axios";
axios.create();
axios.interceptors.request.use(function (config) {
  let authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken.replace(
      /['"]+/g,
      ""
    )}`;
  }
  return config;
});

export default axios;
