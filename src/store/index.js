import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorMessage: "",
    calculatorResult: "",
    expression: []
  },
  mutations: {
    setErrorMessage(state, errorMessage = "") {
      state.errorMessage = errorMessage;
    },
    setCalculatorResult(state, calculatorResult = "") {
      state.calculatorResult = calculatorResult;
    },
    setExpression(state, expression = []) {
      state.expression = expression;
    }
  }
});
