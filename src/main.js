import Vue from "vue/dist/vue.esm";
import Calculator from "src/core/Calculator";

import "src/css/index.css";

const calc = new Calculator();

new Vue({
  el: "#app",
  components: {
    "calc-button": {
      props: {
        type: String,
        isActive: Boolean
      },
      computed: {
        buttonClassName() {
          return [
            this.type ? `calc-button--${this.type}` : "",
            {
              "is-active": this.isActive
            }
          ];
        },
        buttonText() {
          if (this.type === "clear") {
            return "C";
          }

          return this.type;
        }
      },
      methods: {
        onClick() {
          this.$emit("click", this.type);
        }
      },
      template: `
        <button
          class="calc-button"
          :class="buttonClassName"
          @click="onClick"
        >{{ buttonText }}</button>
      `
    }
  },
  data: {
    keyboard: ["clear", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="],
    timer: null,
    errorMessage: "",
    currentKey: "",
    result: "",
    expression: ""
  },
  computed: {
    screenText() {
      if (this.errorMessage) return this.errorMessage;

      return this.result + this.expression;
    }
  },
  methods: {
    onCtrlBtnClick(key) {
      switch (key) {
        case "clear":
          this.clearCalc();
          break;
        case "=":
          this.getCalcResult();
          break;
        case "Backspace":
          this.expression = this.expression.slice(0, -1);
          break;
        default:
          this.expression += key;
          break;
      }
    },
    onKeydown(event) {
      let key = event.key;
      if (key === "Enter" || event.keyCode === 13) {
        key = this.keyboard[this.keyboard.length - 1];
      }
      if (key !== "Backspace" && !this.keyboard.includes(key)) return;

      clearTimeout(this.timer);
      this.currentKey = key;
      this.onCtrlBtnClick(key);
      this.timer = setTimeout(() => {
        this.currentKey = "";
      }, 100);
    },
    clearCalc() {
      calc.clear();
      this.result = "";
      this.expression = "";
      this.errorMessage = "";
    },
    getCalcResult() {
      if (this.errorMessage) return;

      try {
        const result = calc.run(this.expression);
        this.result = String(result);
        this.expression = "";
      } catch (error) {
        calc.clear();
        this.result = "";
        this.expression = "";
        this.errorMessage = error.message;
      }
    }
  },
  created() {
    document.addEventListener("keydown", this.onKeydown);
    document.addEventListener("keyup", this.onKeyup);
  },
  destroyed() {
    document.removeEventListener("keydown", this.onKeydown);
    document.removeEventListener("keyup", this.onKeyup);
  }
}).$mount();
