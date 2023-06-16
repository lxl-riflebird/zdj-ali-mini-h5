<!--
 * @Description: 中转页面
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-06-01 15:33:53
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-01 15:38:50
-->
<script setup>
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();

if (router.currentRoute.value.query.userPhone) {
  localStorage.setItem("ZDphone", router.currentRoute.value.query.userPhone);
}
if (router.currentRoute.value.query.token) {
  localStorage.setItem("ZDtoken", router.currentRoute.value.query.token);
}
if (router.currentRoute.value.query.userPhone && router.currentRoute.value.query.token) {
  router.push({
    name: "home",
  });
} else {
  showToast({
    message: '参数不全',
    type: "fail"
  });
}
</script>

<template></template>

<style lang="less" scoped></style>
