<template>
  <div class="calculator-screen">
    <calculator-screen-text
      class="calculator-screen-text"
    />
  </div>
</template>

<script>
import CalculatorScreenText from "src/components/CalculatorScreenText";

export default {
  name: "CalculatorScreen",
  components: {
    CalculatorScreenText
  }
};
</script>

<style lang="css" scoped>
.calculator-screen-text {
  color: #E7EAEF;
  font-size: 1.963rem;
  min-height: 1.963rem;
  line-height: 1;
  word-break: break-all;
}
</style>
