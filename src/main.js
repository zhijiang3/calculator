import Vue from "vue/dist/vue.esm";
import Calculator from "src/core/Calculator";
import Stack from "src/core/Stack";

import "src/css/index.css";

const calc = new Calculator();

window.onload = function() {
  document.documentElement.style.fontSize = `${Math.min(400 / 16, document.documentElement.clientWidth / 16)}px`;
};

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
        >
          <slot />
        </button>
      `
    }
  },
  data: {
    // prettier-ignore
    keyboard: [
      "Clear", "LeftParentheses", "RightParentheses", "Div",
      "7", "8", "9", "Mul",
      "4", "5", "6", "Sub",
      "1", "2", "3", "Add",
      "0", "Dot", "Backspace", "Equal"
    ],
    timer: null,
    errorMessage: "",
    currentKey: "",
    result: "",
    expression: ""
  },
  computed: {
    screenText() {
      if (this.errorMessage) return this.errorMessage;
      if (this.result) return this.result;

      return this.expression.replace(/\//g, "÷").replace(/\*/g, "×");
    }
  },
  methods: {
    getCalcBtnText(key) {
      switch (key) {
        case "Clear":
          return this.screenText == "" ? "AC" : "C";
        case "LeftParentheses":
          return "(";
        case "RightParentheses":
          return ")";
        case "Div":
          return "÷";
        case "Mul":
          return "×";
        case "Sub":
          return "-";
        case "Add":
          return "+";
        case "Dot":
          return ".";
        case "Backspace":
          return "←";
        case "Equal":
          return "=";
        default:
          return key;
      }
    },
    isOperator(word = "") {
      return ["Div", "Mul", "Sub", "Add"].indexOf(word) > -1;
    },
    isEqual(word = "") {
      return word === "Equal";
    },
    isBackspace(word = "") {
      return word === "Backspace";
    },
    isDot(word = "") {
      return word === "Dot";
    },
    isClear(word = "") {
      return word === "Clear";
    },
    isLeftParentheses(word = "") {
      return word === "LeftParentheses";
    },
    isRightParentheses(word = "") {
      return word === "RightParentheses";
    },
    checkRecentDecimal(exp = "") {
      const lastWord = exp.slice(-1);
      let current = exp.length;
      let number = "";

      while (current--) {
        const word = exp[current];
        const OPERATOR = /(\+|\-|\*|\/)/;

        if (OPERATOR.test(word)) break;

        number = word + number;
      }

      if (lastWord !== ")" && (number === "" || number.indexOf(".") === -1)) {
        return false;
      } else {
        return true;
      }
    },
    checkLeftParentheses(exp = "") {
      const OPERATOR = /(\+|\-|\*|\/)/;

      return exp === "" || OPERATOR.test(exp.slice(-1)) || exp.slice(-1) === "(";
    },
    checkRightParentheses(exp = "") {
      const lastWord = exp.slice(-1);
      const NUMBERS = /[0-9\.]/;
      const stack = new Stack();

      for (let i = 0; i < exp.length; i++) {
        if (exp[i] === "(") {
          stack.push("(");
        } else if (exp[i] === ")") {
          stack.pop();
        }
      }

      return !stack.isEmpty() && (lastWord === ")" || NUMBERS.test(lastWord));
    },
    checkAddNumber(exp = "") {
      const lastWord = exp.slice(-1);

      return lastWord !== ")";
    },
    onCtrlBtnClick(key) {
      if (this.isClear(key)) {
        this.clearCalc();
        return;
      }

      if (this.isBackspace(key)) {
        this.expression = this.expression.slice(0, -1);
        return;
      }

      if (this.isOperator(key)) {
        if (this.result !== "") {
          this.expression = this.result;
          this.result = "";
        }

        const OPERATOR_MAP = {
          Div: "/",
          Mul: "*",
          Sub: "-",
          Add: "+"
        };
        const operator = OPERATOR_MAP[key];
        const OPERATOR = /(\+|\-|\*|\/)/;
        const lastWord = this.expression.slice(-1);
        // 如果最后一个输入的是操作符，则替换
        if (OPERATOR.test(lastWord)) {
          this.expression = this.expression.slice(0, -1) + operator;
        } else {
          this.expression += operator;
        }
        return;
      }

      if (this.isDot(key)) {
        if (this.result !== "") {
          this.expression = this.result;
          this.result = "";
        }
        if (!this.checkRecentDecimal(this.expression)) {
          this.expression += ".";
        }
        return;
      }

      if (this.isLeftParentheses(key)) {
        if (this.checkLeftParentheses(this.expression)) {
          this.expression += "(";
        }
        return;
      }

      if (this.isRightParentheses(key)) {
        if (this.checkRightParentheses(this.expression)) {
          this.expression += ")";
        }
        return;
      }

      // 检查数字
      const NUMBERS = /[0-9]/;
      if (NUMBERS.test(key)) {
        if (this.result !== "") this.result = "";

        if (this.checkAddNumber(this.expression)) {
          this.expression += key;
        }
        return;
      }

      if (this.isEqual(key)) {
        this.getCalcResult();
        return;
      }
    },
    onKeydown(event) {
      let key = event.key;
      if (key === "Enter" || event.keyCode === 13) {
        key = this.keyboard[this.keyboard.length - 1];
      }
      if (!this.keyboard.includes(key)) return;

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
      if (this.errorMessage || this.result !== "") return;

      try {
        const result = calc.run(this.expression);
        this.result = String(result);
        this.expression = "";
      } catch (error) {
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
