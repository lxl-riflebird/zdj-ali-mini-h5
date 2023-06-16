<!--
 * @Description: 详情
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-06-01 16:09:35
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-14 15:54:14
-->
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { apiDetail } from "@/utils/api.js";
import { useRouter } from "vue-router";
const router = useRouter();
const orderNo = ref("");
if (router.currentRoute.value.query.orderNo) {
  orderNo.value = router.currentRoute.value.query.orderNo;
}
const detail = reactive({
  appointInstallDuring: "",
  orderLeader: "",
  createdWhen: "",
  orderNo: "",
  appointInstallTime: "",
  installFinishWhen: "",
  currentStatus: "",
  supplierAcceptWhen: "",
  appointWhen: "",
  province: "",
  supplierScore: "",
  supplierOrderNum: "",
  orderReplyStatus: "",
  cancelWhen: "",
});
onMounted(() => {
  getDetail()
})
function getDetail() {
  apiDetail({orderNo: orderNo.value})
    .then((res) => {
      for (let k in detail) {
        if (k === "supplierOrderNum") {
          if (res.data[k] < 543) {
            detail[k] = 543
          } else {
            detail[k] = res.data[k]
          }
        } else {
          detail[k] = res.data[k]
        }
      }
    })
}
// 服务等级
const supplierLevel = computed(() => {
  let num = 4;
  if (detail.supplierScore >= 60) {
    num = 5;
  } else if (detail.supplierScore >= 55) {
    num = 4.5;
  } else {
    num = 4;
  }
  return num;
});
// 打电话
function toCall() {
  window.location.href = "tel:400-659-6580";
}
// 去评价页
function toEvaluation() {
  if (detail.orderReplyStatus === "03") {
    router.push({
      name: "evaluation",
      query: {
        orderNo: orderNo.value,
        type: "01", // 代表待评价，可以提交
      }
    })
  } else {
    router.push({
      name: "evaluation",
      query: {
        orderNo: orderNo.value,
        type: "02", // 代表已评价，只能查看
      }
    })
  }
}
</script>

<template>
  <div class="body">
    <div class="title">订单进度信息</div>
    <div class="fu-title">订单号：{{ orderNo }}</div>
    <div class="content">
      <div v-if="detail.cancelWhen" class="step step5">
        <div class="step-left">
          <div>{{ detail.cancelWhen }}</div>
        </div>
        <div class="step-middle">
          <div class="dot4"><div class="slash"></div></div>
        </div>
        <div class="step-right">
          <div class="txt1">已取消</div>
        </div>
      </div>
      <div class="step step4">
        <div class="step-left">
          <div v-if="detail.currentStatus === '04'">{{ detail.installFinishWhen }}</div>
        </div>
        <div class="step-middle">
          <div v-if="['01', '02'].includes(detail.currentStatus)" class="dot1"></div>
          <div v-if="detail.currentStatus === '03'" class="dot2"><img src="@/assets/img/wait.png" alt="" /></div>
          <div v-if="detail.currentStatus === '04'" class="dot3">
            <van-icon name="checked" color="#1677FF" size="19" />
          </div>
        </div>
        <div v-if="detail.currentStatus === '04'" class="step-right">
          <div class="txt1">安装完成</div>
          <div class="txt2">充电桩安装完成</div>
        </div>
        <div v-else class="step-right">
          <div class="txt1">待安装</div>
          <div class="txt2">待安装完成</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="step step3">
        <div class="step-left">
          <div v-if="['03', '04'].includes(detail.currentStatus)">{{ detail.appointWhen }}</div>
        </div>
        <div class="step-middle">
          <div v-if="detail.currentStatus === '01'" class="dot1"></div>
          <div v-if="detail.currentStatus === '02'" class="dot2"><img src="@/assets/img/wait.png" alt="" /></div>
          <div v-if="['03', '04'].includes(detail.currentStatus)" class="dot3">
            <van-icon name="checked" color="#1677FF" size="19" />
          </div>
        </div>
        <div v-if="['03', '04'].includes(detail.currentStatus)" class="step-right">
          <div class="txt1">预约成功</div>
          <div class="txt2">
            预约<span>{{ detail.appointInstallTime }}</span>
          </div>
          <div class="txt2">
            <span>{{ detail.appointInstallDuring }}</span> 上门
          </div>
        </div>
        <div v-else class="step-right">
          <div class="txt1">待预约</div>
          <div class="txt2">待客服主动联系</div>
          <div class="txt3">并确认预约上门时间</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="step step2">
        <div class="step-left">
          <div v-if="['02', '03', '04'].includes(detail.currentStatus)">{{ detail.supplierAcceptWhen }}</div>
        </div>
        <div class="step-middle">
          <div v-if="detail.currentStatus === '01'" class="dot2"><img src="@/assets/img/wait.png" alt="" /></div>
          <div v-if="['02', '03', '04'].includes(detail.currentStatus)" class="dot3">
            <van-icon name="checked" color="#1677FF" size="19" />
          </div>
        </div>
        <div v-if="['02', '03', '04'].includes(detail.currentStatus)" class="step-right">
          <div class="txt1">已接单</div>
          <div class="txt2">服务商已接单</div>
        </div>
        <div v-else class="step-right">
          <div class="txt1">待接单</div>
          <div class="txt2">待服务商接单</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="step step1">
        <div class="step-left">
          <div>{{ detail.createdWhen }}</div>
        </div>
        <div class="step-middle">
          <div class="dot3">
            <van-icon name="checked" color="#1677FF" size="19" />
          </div>
        </div>
        <div class="step-right">
          <div class="txt1">安装订单已创建</div>
          <div class="txt2">订单创建完成</div>
        </div>
      </div>
    </div>
    <div v-if="['02', '03', '04'].includes(detail.currentStatus) && !detail.cancelWhen">
      <div class="fu-title">
        订单服务信息<span class="dot"></span>
      </div>
      <div
        class="serve-content"
        :class="detail.currentStatus === '02' ? 'radius-13' : ''"
      >
        <div class="item">
          <div class="item-left">服务专员</div>
          <div class="item-right" @click="toCall">
            小挚<van-icon class="phone" name="phone-o" color="#1677FF" size="20px" />
          </div>
        </div>
        <div v-if="detail.currentStatus !== '02'" class="item">
          <div class="item-left">服务网点</div>
          <div class="item-right">挚达{{ detail.province }}服务网点</div>
        </div>
        <div v-if="detail.currentStatus !== '02'" class="item">
          <div class="item-left">服务等级</div>
          <div class="item-right">
            <van-rate v-model="supplierLevel" :size="20" color="#F5A623" readonly allow-half />
          </div>
        </div>
        <div v-if="detail.currentStatus !== '02'" class="item">
          <div class="item-left">累计服务数</div>
          <div class="item-right">{{ detail.supplierOrderNum }}</div>
        </div>
        <div v-if="detail.currentStatus === '04'" class="item">
          <div class="item-left">订单评价</div>
          <div class="item-right blue" @click="toEvaluation">{{ detail.orderReplyStatus === "03" ? "待评价" : "已评价" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.body {
  padding-bottom: 20px;
}
.title {
  padding: 24px 24px 0;
  font-size: 24px;
  font-weight: 600;
}
.blue {
  color: #1677ff;
}
.fu-title {
  display: flex;
  align-items: center;
  padding: 24px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #2d3748;
  .dot {
    display: block;
    width: 5px;
    height: 5px;
    background: #1677ff;
    border-radius: 50%;
    margin-left: 10px;
  }
}
.content {
  background: #ffffff;
  box-shadow: 0px 0px 15px 7px rgba(221, 221, 221, 0.45);
  border-radius: 30px;
  margin: 0 24px;
  padding: 29px 24px 40px;
  .step {
    display: flex;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2d3748;
    height: 26px;
    &.step5 {
      padding-bottom: 65px;
    }
    .step-left {
      width: 80px;
      flex-shrink: 0;
      text-align: right;
      font-size: 12px;
    }
    .step-middle {
      width: 50px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      .dot1 {
        width: 17px;
        height: 17px;
        border: 1px solid #1677ff;
        border-radius: 50%;
      }
      .dot2 {
        width: 17px;
        height: 17px;
        border: 1px solid #1677ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 12px;
          display: block;
          transform: rotate(45deg);
        }
      }
      .dot3 {
        width: 19px;
        height: 19px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          display: block;
        }
      }
      .dot4 {
        width: 17px;
        height: 17px;
        border: 1px solid #2d3748;
        border-radius: 50%;
        opacity: 0.52;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .slash {
          width: 100%;
          height: 1px;
          background: #2d3748;
          transform: rotate(-45deg);
        }
      }
    }
    .step-right {
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #2d3748;
      .txt1 {
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
      }
      .txt2 {
        font-size: 12px;
        font-weight: 400;
        line-height: 17px;
        span {
          color: #ff6565;
        }
      }
      .txt3 {
        font-size: 12px;
        font-weight: 400;
        line-height: 17px;
      }
    }
  }
  .line {
    width: 1px;
    height: 97px;
    background: linear-gradient(180deg, rgba(22, 119, 255, 0.35), rgba(22, 119, 255, 1), rgba(22, 119, 255, 0.35));
    margin: 0 0 10px 105px;
  }
}
.serve-content {
  background: #ffffff;
  box-shadow: 0px 0px 15px 7px rgba(236, 235, 236, 0.25);
  border-radius: 30px;
  margin: 0 24px;
  padding: 20px 20px 0px;
  &.radius-13 {
    border-radius: 13px;
  }
  .item {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #2d3748;
    .item-left {
      width: 80px;
      flex-shrink: 0;
    }
    .item-right {
      text-align: right;
      display: flex;
      align-items: center;
      .phone {
        padding-left: 10px;
      }
      :deep(.van-rate__icon--half) {
        position: absolute !important;
      }
    }
  }
}
</style>
