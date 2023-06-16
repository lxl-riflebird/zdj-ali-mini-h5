<script setup>

</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
:root {
  --Color: #3eaee8;
  --Blue: rgb(22, 119, 255);
}
// :root:root {
//   --van-primary-color: #EA5504;
//   --van-button-radius: var(--van-radius-lg);
//   --van-cell-font-size: 15px;
// }
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif; */
  font-family: "PingFang SC", "Roboto", "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif !important;
  font-size: 14px;
  background: #F6F6F8;
  a {
    color: var(--Blue);
    font-size: 14px;
    text-decoration: underline;
  }
}

</style>
