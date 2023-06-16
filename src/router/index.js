/*
 * @Description: 路由文件
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-04-06 09:30:04
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-12 13:07:14
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    // 中转页面
    path: "/transfer",
    name: "transfer",
    component: () => import("@/views/transfer/index.vue"),
  },
  {
    // 首页
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    // 详情
    path: "/detail",
    name: "detail",
    component: () => import("@/views/home/detail.vue"),
  },
  {
    // 评价
    path: "/evaluation",
    name: "evaluation",
    component: () => import("@/views/home/evaluation.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
