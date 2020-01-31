<template>
  <calculator />
</template>

<script>
import Calculator from "src/components/Calculator";

export default {
  name: "App",
  components: {
    Calculator
  }
};
</script>

<style lang="css">
body {
  padding: 0;
  margin: 0;
  font-family: "PingFang SC", "Microsoft YaHei";
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  max-width: 400px;
}
</style>
