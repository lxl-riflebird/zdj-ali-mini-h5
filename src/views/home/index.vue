<!--
 * @Description: 首页
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-04-06 09:53:28
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-12 14:06:12
-->
<script setup>
import { ref, reactive } from "vue";
import { apiList } from "@/utils/api.js";
import { showToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
if (router.currentRoute.value.query.userPhone && router.currentRoute.value.query.token) {
  localStorage.setItem("ZDphone", router.currentRoute.value.query.userPhone);
  localStorage.setItem("ZDtoken", router.currentRoute.value.query.token);
}
const pagination = reactive({
  pageNum: 0,
  pageSize: 10,
});
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
// 获取列表
function getList(reload = false) {
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  if (reload) {
    list.value = [];
    pagination.pageNum = 0;
  }
  const params = {
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    userPhone: localStorage.getItem("ZDphone"),
  };
  apiList(params).then((res) => {
    loading.value = false;
    if (res.data && res.data.length > 0) {
      pagination.pageNum++;
      res.data.map((x) => {
        list.value.push(x);
      });
      if (res.data.length < pagination.pageSize) {
        finished.value = true;
      }
    } else {
      finished.value = true;
    }
  });
}
// 刷新
function onRefresh() {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  getList(true);
}
// 跳转详情
function toDetail(orderNo) {
  router.push({
    name: "detail",
    query: {
      orderNo: orderNo
    }
  })
}
// 根据状态获取名称
function getName(status) {
  switch (status) {
    case "01":
      return "已创建";
    case "02":
      return "已接单";
    case "03":
      return "预约成功";
    case "04":
      return "订单完成";
    case "05":
      return "已取消";

    default:
      break;
  }
}
</script>

<template>
  <div>
    <div class="title">安装订单</div>
    <!-- <div v-if="list.length === 0" class="kong">
      <div class="img-box">
        <img src="@/assets/img/kong1.png" alt="" />
      </div>
      <div class="tip">暂无数据</div>
    </div> -->
    <van-empty v-if="list.length === 0" description="暂无数据" />
    <van-pull-refresh class="content" v-model="refreshing" @refresh="onRefresh">
      <van-list
        :class="list.length === 0 ? 'none' : ''"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <div v-for="item in list" :key="item" class="box" @click="toDetail(item.orderNo)">
          <div class="box-top">
            <div class="box-top-left">{{ item.orderNo }}</div>
            <div class="box-top-right">{{ getName(item.orderStatus) }}</div>
          </div>
          <div class="box-bottom">
            <div class="item">
              <div class="item-left">用户姓名</div>
              <div class="item-right">{{ item.contactName }}</div>
            </div>
            <div class="item">
              <div class="item-left">手机号码</div>
              <div class="item-right">{{ item.contactPhone }}</div>
            </div>
            <div class="item">
              <div class="item-left">安装地址</div>
              <div class="item-right">
                <div>{{ item.installProvince }} {{ item.installCity }} {{ item.installDistrict }}</div>
                <div>{{ item.installAddress }}</div>
              </div>
            </div>
            <div class="item">
              <div class="item-left">创建时间</div>
              <div class="item-right">{{ item.createdWhen }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="less" scoped>
.none {
  :deep(.van-list__finished-text) {
    display: none;
  }
}
.title {
  padding: 24px 24px 0;
  font-size: 24px;
  font-weight: 600;
}
.kong {
  padding-top: 170px;
  padding-bottom: 40px;
  .tip {
    text-align: center;
    color: #a5a8a9;
    font-size: 16px;
  }
  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    img {
      display: block;
      width: 50%;
    }
  }
}
.search-box {
  background: white;
  width: 100%;
  position: fixed;
  left: 0;
  top: v-bind(top);
  z-index: 1;
}
.content {
  font-size: 16px;
  .van-list {
    .box {
      margin: 24px;
      width: auto;
      background: #ffffff;
      box-shadow: 0px 0px 15px 7px rgba(221, 221, 221, 0.45);
      border-radius: 30px;
      .box-top {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        background: #f6f7f7;
        border-radius: 30px 30px 0 0;
        .box-top-left {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #2d3748;
        }
        .box-top-right {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1677ff;
        }
      }
      .box-bottom {
        padding: 24px 24px 0;
        .item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2d3748;
          padding-bottom: 20px;
          .item-left {
            width: 80px;
            flex-shrink: 0;
          }
          .item-right {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
