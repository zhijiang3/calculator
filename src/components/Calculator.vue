<template>
  <div class="calculator">
    <calculator-screen class="calculator-screen" />
    <calculator-ctrl class="calculator-ctrl" />
  </div>
</template>

<script>
import CalculatorScreen from "src/components/CalculatorScreen";
import CalculatorCtrl from "src/components/CalculatorCtrl";

export default {
  name: "Calculator",
  components: {
    CalculatorScreen,
    CalculatorCtrl
  }
};
</script>

<style lang="css" scoped>
.calculator {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #141A32;
}

.calculator-screen {
  background: #141A32;
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1.109rem 0.623rem;
}

.calculator-ctrl {
  background: #1E2747;
  box-sizing: border-box;
  padding: 0.363rem;
  display: flex;
  flex-wrap: wrap;
}
</style>

<style lang="css">
.calculator-skeleton {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.calculator-screen-skeleton {
  background: #EEEEEE;
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1.109rem 0.623rem;
}

.calculator-screen-text-skeleton {
  height: 1.963rem;
  width: 85%;
  background: #E5E5E5;
}

.calculator-ctrl-skeleton {
  padding: 0.363rem 0;
  display: flex;
  flex-direction: column;
}

.calculator-ctrl-row-skeleton {
  height: 3.093rem;
  margin: 0.362rem 0;
  background: #EEEEEE;
}
</style>
