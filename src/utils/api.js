/*
 * @Description:
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-05-09 16:58:06
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-09 14:06:40
 */
// 导入axios实例
import httpRequest from "@/utils/service";

// 查询我的安装订单
export function apiList(param = {}) {
  return httpRequest({
    url: "/api/d1/aliMiniPro/zhidaAliApplet/queryOrderByPhone",
    method: "post",
    data: param,
  });
}

// 查看安装进度
export function apiDetail(param = {}) {
  return httpRequest({
    url: "/api/d1/aliMiniPro/zhidaAliApplet/queryOrderStep",
    method: "post",
    data: param,
  });
}

// 查看已评价数据
export function queryOrderReply(param = {}) {
  return httpRequest({
    url: "/api/d1/aliMiniPro/zhidaAliApplet/queryOrderReply",
    method: "post",
    data: param,
  });
}

// 新增评价
export function submitOrderReply(param = {}) {
  return httpRequest({
    url: "/api/d1/aliMiniPro/zhidaAliApplet/submitOrderReply",
    method: "post",
    data: param,
  });
}
