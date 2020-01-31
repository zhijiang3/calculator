import Vue from "vue";
import App from "./App";
import store from "src/store/index";

window.onload = function() {
  document.documentElement.style.fontSize = `${Math.min(400 / 16, document.documentElement.clientWidth / 16)}px`;
};

new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount();
