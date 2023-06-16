/*
 * @Description:
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-06-12 13:37:14
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-12 13:38:49
 */

import { defineStore } from "pinia";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore("main", {
  state: () => {
    //创建状态
    return {
      token: localStorage.getItem("ZDtoken"),
    };
  },
});
