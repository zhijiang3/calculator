<script>
import { mapState } from "vuex";
import {
  isCalculatorDot,
  isCalculatorAdd,
  isCalculatorSub,
  isCalculatorMul,
  isCalculatorDiv,
  isCalculatorLeftParentheses,
  isCalculatorRightParentheses
} from 'src/utils/calculatorKey';

export default {
  name: "CalculatorScreenText",
  computed: {
    ...mapState([
      "calculatorResult",
      "errorMessage",
      "expression"
    ])
  },
  render(h) {
    if (this.errorMessage) {
      return <span>{this.errorMessage}</span>;
    }

    if (this.calculatorResult) {
      return <span>{this.calculatorResult}</span>;
    }

    if (this.expression.length === 0) {
      return <span>0</span>;
    }

    return (
      <span>
        {
          this.expression.map(word => {
            if (isCalculatorDot(word)) {
              return <span>.</span>;
            } else if (isCalculatorAdd(word)) {
              return <span>+</span>;
            } else if (isCalculatorSub(word)) {
              return <span>-</span>;
            } else if (isCalculatorMul(word)) {
              return <span>×</span>;
            } else if (isCalculatorDiv(word)) {
              return <span>÷</span>;
            } else if (isCalculatorLeftParentheses(word)) {
              return <span>(</span>;
            } else if (isCalculatorRightParentheses(word)) {
              return <span>)</span>;
            } else {
              return<span>{word}</span>;
            }
          })
        }
      </span>
    );
  }
};
</script>
