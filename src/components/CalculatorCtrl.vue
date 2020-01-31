<template>
  <div class="calculator-ctrl">
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--clear"
      :class="{
        'is-active': keyboardInput === 'Clear'
      }"
      @click="onClear"
    >
      <span>{{ expression.length === 0 && calculatorResult === "" ? "AC" : "C" }}</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--left-parentheses"
      :class="{
        'is-active': keyboardInput === 'LeftParentheses'
      }"
      @click="onLeftParentheses"
    >
      <span>(</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--right-parentheses"
      :class="{
        'is-active': keyboardInput === 'RightParentheses'
      }"
      @click="onRightParentheses"
    >
      <span>)</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--div"
      :class="{
        'is-active': keyboardInput === 'Div'
      }"
      @click="onOperator('Div')"
    >
      <span>÷</span>
    </button>

    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '7'
      }"
      @click="onNumberKeyDown('7')"
    >
      <span>7</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '8'
      }"
      @click="onNumberKeyDown('8')"
    >
      <span>8</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '9'
      }"
      @click="onNumberKeyDown('9')"
    >
      <span>9</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--mul"
      :class="{
        'is-active': keyboardInput === 'Mul'
      }"
      @click="onOperator('Mul')"
    >
      <span>×</span>
    </button>

    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '4'
      }"
      @click="onNumberKeyDown('4')"
    >
      <span>4</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '5'
      }"
      @click="onNumberKeyDown('5')"
    >
      <span>5</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '6'
      }"
      @click="onNumberKeyDown('6')"
    >
      <span>6</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--sub"
      :class="{
        'is-active': keyboardInput === 'Sub'
      }"
      @click="onOperator('Sub')"
    >
      <span>-</span>
    </button>

    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '1'
      }"
      @click="onNumberKeyDown('1')"
    >
      <span>1</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '2'
      }"
      @click="onNumberKeyDown('2')"
    >
      <span>2</span>
    </button>
    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '3'
      }"
      @click="onNumberKeyDown('3')"
    >
      <span>3</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--add"
      :class="{
        'is-active': keyboardInput === 'Add'
      }"
      @click="onOperator('Add')"
    >
      <span>+</span>
    </button>

    <button
      class="calculator-ctrl-btn"
      :class="{
        'is-active': keyboardInput === '0'
      }"
      @click="onNumberKeyDown('0')"
    >
      <span>0</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--dot"
      :class="{
        'is-active': keyboardInput === 'Dot'
      }"
      @click="onDot"
    >
      <span>.</span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--backspace"
      :class="{
        'is-active': keyboardInput === 'Backspace'
      }"
      @click="onBackspace"
    >
      <span><img class="icon" :src="iconBackspace" /></span>
    </button>
    <button
      class="calculator-ctrl-btn calculator-ctrl-btn--equal"
      :class="{
        'is-active': keyboardInput === 'Equal'
      }"
      @click="onEqual"
    >
      <span>=</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Stack from "src/core/Stack";
import calculator from "src/utils/calculator";
import {
  isValidCalculatorKey,
  parseCalculatorKey,
  parseCalculatorExpression,
  isCalculatorOperator,
  isCalculatorBackspace,
  isCalculatorClear,
  isCalculatorEqual,
  isCalculatorLeftParentheses,
  isCalculatorRightParentheses,
  isCalculatorDot
} from "src/utils/calculatorKey";
import iconBackspace from "src/assets/icon/icon-backspace.png";

export default {
  name: "CalculatorCtrl",
  data() {
    return {
      iconBackspace,

      timer: null,
      keyboardInput: ""
    };
  },
  computed: {
    ...mapState([
      "errorMessage",
      "calculatorResult",
      "expression"
    ])
  },
  methods: {
    addResultToExpression() {
      if (this.calculatorResult !== "") {
        this.$store.commit("setExpression", this.calculatorResult.split(""));
        this.$store.commit("setCalculatorResult");
      }
    },
    highlightKey(calculatorKey = "") {
      this.keyboardInput = calculatorKey;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.keyboardInput = "";
      }, 100);
    },

    onKeydown(event) {
      if (!isValidCalculatorKey(event.key)) return;

      event.stopPropagation();
      event.preventDefault();

      const key = parseCalculatorKey(event.key);

      this.highlightKey(key);

      if (isCalculatorOperator(key)) {
        this.onOperator(key);
      } else if (isCalculatorBackspace(key)) {
        this.onBackspace();
      } else if (isCalculatorClear(key)) {
        this.onClear();
      } else if (isCalculatorEqual(key)) {
        this.onEqual();
      } else if (isCalculatorLeftParentheses(key)) {
        this.onLeftParentheses();
      } else if (isCalculatorRightParentheses(key)) {
        this.onRightParentheses();
      } else if (isCalculatorDot(key)) {
        this.onDot();
      } else {
        this.onNumberKeyDown(key);
      }
    },

    onNumberKeyDown(key) {
      if (this.calculatorResult !== "") {
        this.$store.commit("setCalculatorResult");
      }

      // 右括号后只能跟着表达式
      const lastWord = this.expression.slice(-1)[0];
      if (isCalculatorRightParentheses(lastWord)) return;

      const number = parseCalculatorKey(key);
      this.$store.commit("setExpression", [...this.expression, number]);
    },
    onClear() {
      calculator.clear();
      this.$store.commit("setExpression");
      this.$store.commit("setCalculatorResult");
      this.$store.commit("setErrorMessage");
    },
    onLeftParentheses() {
      const lastWord = this.expression.slice(-1)[0];

      if (this.expression.length === 0
        || isCalculatorOperator(lastWord)
        || isCalculatorLeftParentheses(lastWord)) {
        const leftParentheses = parseCalculatorKey("(");
        this.$store.commit("setExpression", [...this.expression, leftParentheses]);
      }
    },
    onRightParentheses() {
      // 检查括号是否匹配
      const stack = new Stack();
      for (let word of this.expression) {
        if (isCalculatorLeftParentheses(word)) {
          stack.push("left");
        } else if (isCalculatorRightParentheses(word)) {
          stack.pop();
        }
      }
      // 括号已经是成队出现的，不需要再添加右括号
      if (stack.isEmpty()) return;

      const lastWord = this.expression.slice(-1)[0];

      if (isCalculatorRightParentheses(lastWord)
        || isCalculatorDot(lastWord)
        || /[0-9]/.test(lastWord)) {
        const rightParentheses = parseCalculatorKey(")");
        this.$store.commit("setExpression", [...this.expression, rightParentheses]);
      }
    },
    onOperator(key) {
      const calculatorKey = parseCalculatorKey(key);

      if (calculatorKey == null) return;

      this.addResultToExpression();

      let newExpression;
      const lastWord = this.expression.slice(-1)[0];
      if (isCalculatorOperator(lastWord)) {
        newExpression = this.expression.slice(0, -1).concat(calculatorKey);
      } else {
        newExpression = [...this.expression, calculatorKey];
      }
      this.$store.commit("setExpression", newExpression)
    },
    onBackspace() {
      this.$store.commit("setExpression", this.expression.slice(0, -1));
    },
    onDot() {
      this.addResultToExpression();

      // 上一个字符不是右括号
      const lastWord = this.expression.slice(-1)[0];
      if (isCalculatorRightParentheses(lastWord)) return;

      // 检查最近的一个数字是否没有小数点
      let number = "";
      for (let word of this.expression) {
        if (isCalculatorOperator(word)) break;

        number = word + number;
      }
      for (let i = 0; i < number.length; i++) {
        if (isCalculatorDot(number[i])) return;
      }

      const dot = parseCalculatorKey(".");
      this.$store.commit("setExpression", [...this.expression, dot]);
    },
    onEqual() {
      if (this.errorMessage !== "" || this.calculatorResult !== "") return;

      try {
        const calculatorResult = calculator.run(parseCalculatorExpression(this.expression));

        this.$store.commit("setCalculatorResult", `${calculatorResult}`);
        this.$store.commit("setExpression");
      } catch (error) {
        this.$store.commit("setErrorMessage", error.message);
      }
    }
  },
  created() {
    document.addEventListener("keydown", this.onKeydown);
  },
  destroyed() {
    document.removeEventListener("keydown", this.onKeydown);
  }
};
</script>

<style lang="css" scoped>
.calculator-ctrl-btn {
  padding: 0;
  margin: 0.362rem;
  border: 0;
  outline: 0;
  text-align: center;
  transition: all 0.1s;
  width: 3.093rem;
  height: 3.093rem;
  line-height: 3.093rem;
  border-radius: 50%;
  background: rgba(229, 229, 234, 0.05);
  color: #8E9CB2;
  font-size: 1.28rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator-ctrl-btn .icon {
  display: block;
  font-size: 1.28rem;
  width: 1.28rem;
  height: 1.28rem;
}

.calculator-ctrl-btn:active,
.calculator-ctrl-btn.is-active {
  background: rgba(229, 229, 234, 0.4);
}

.calculator-ctrl-btn.calculator-ctrl-btn--clear,
.calculator-ctrl-btn.calculator-ctrl-btn--left-parentheses,
.calculator-ctrl-btn.calculator-ctrl-btn--right-parentheses,
.calculator-ctrl-btn.calculator-ctrl-btn--div {
  height: 2.219rem;
  line-height: 2.219rem;
  border-radius: 1.109rem;
}

.calculator-ctrl-btn.calculator-ctrl-btn--equal {
  background: #E68808;
  color: #FFFFFF;
}
</style>
