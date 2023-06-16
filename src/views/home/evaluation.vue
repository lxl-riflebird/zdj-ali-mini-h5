<!--
 * @Description: 评价
 * @Version: 1.0
 * @Author: lixinlong
 * @Date: 2023-06-02 14:05:17
 * @LastEditors: lixinlong
 * @LastEditTime: 2023-06-09 15:32:44
-->
<script setup>
import { ref, reactive, onMounted } from "vue";
import { showToast } from "vant";
import { queryOrderReply, submitOrderReply } from "@/utils/api.js";
import { useRouter } from "vue-router";
const router = useRouter();
const orderNo = ref("");
const type = ref("01"); // 01代表未评价，02代表已评价
if (router.currentRoute.value.query.orderNo) {
  orderNo.value = router.currentRoute.value.query.orderNo;
}
if (router.currentRoute.value.query.type) {
  type.value = router.currentRoute.value.query.type;
}
const params = reactive({
  constructionAttitude: "",
  explainProcessPreparation: "",
  appointmentAgreedArrive: "",
  professionalFriendly: "",
  explainItemsCosts: "",
  trialRecovery: "",
  handlingWarranty: "",
  remark: "",
});

onMounted(() => {
  if (type.value === "02") {
    getDetail()
  }
})

function getDetail() {
  queryOrderReply({orderNo: orderNo.value})
    .then((res) => {
      for (let k in params) {
        params[k] = res.data[k]
      }
    })
}

const submitIng = ref(false);
// 提交
function onSubmit() {
  if (submitIng.value) {
    return;
  }
  submitIng.value = true;
  let obj = {
    ...params,
    orderNo: orderNo.value,
    createReplyPhone: localStorage.getItem("ZDphone"),
  };
  // console.log(obj)
  // router.go(-1);
  submitOrderReply(obj)
    .then((res) => {
      if (res.status === 200) {
        showToast({
          message: "提交成功",
          type: "success",
        });
        router.go(-1);
      } else {
        showToast({
          message: res.msg || "提交失败",
          type: "fail",
        });
      }
    })
    .finally(() => {
      submitIng.value = false;
    });
}
</script>

<template>
  <div class="body">
    <div class="title">订单服务评价</div>
    <van-form label-align="top" :readonly="type === '02'" @submit="onSubmit">
      <div class="content">
        <van-cell-group :border="false">
          <van-field
            name="constructionAttitude"
            label="1.请问您对本次充电桩安装服务的整体情况是否满意？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.constructionAttitude" direction="horizontal">
                <van-radio name="01">非常满意</van-radio>
                <van-radio name="02">满意</van-radio>
                <van-radio name="03">一般</van-radio>
                <van-radio name="04">不满意</van-radio>
                <van-radio name="05">非常不满意</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="explainProcessPreparation"
            label="2.客服人员是否有向您解释清楚安装流程及准备材料？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.explainProcessPreparation" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="appointmentAgreedArrive"
            label="3.安装人员是否提前与您预约并在约定时间内到达现场？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.appointmentAgreedArrive" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="professionalFriendly"
            label="4.您认为安装师傅是否专业、态度热情友好？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.professionalFriendly" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="explainItemsCosts"
            label="5.安装方案确认后，服务人员是否向您解释清楚安装项目及所需费用？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.explainItemsCosts" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="trialRecovery"
            label="6.安装人员是否在现场指导您试用和恢复急停按钮？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.trialRecovery" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            name="handlingWarranty"
            label="7.安装完毕后安装师傅是否有向您讲解充电桩操作流程、常见故障处理方式及安装服务质保政策？"
            :rules="[{ required: true, message: '请选择' }]"
          >
            <template #input>
              <van-radio-group v-model="params.handlingWarranty" direction="horizontal">
                <van-radio name="Y">是</van-radio>
                <van-radio name="N">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group :border="false">
          <van-field
            v-model="params.remark"
            class="textarea"
            name="remark"
            label="8.意见或建议"
            rows="6"
            autosize
            type="textarea"
            maxlength="150"
            placeholder="留下您宝贵的意见，您的意见是我们完成服务的动力"
            show-word-limit
          >
          </van-field>
        </van-cell-group>
        <div v-if="type === '02'" class="cover"></div>
      </div>
      <div v-if="type === '01'" style="margin: 24px">
        <van-button class="submit" round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
.body {
  padding-bottom: 20px;
}
.title {
  padding: 24px 24px;
  font-size: 24px;
  font-weight: 600;
}
.content {
  background: #ffffff;
  box-shadow: 0px 0px 15px 7px rgba(221, 221, 221, 0.45);
  border-radius: 30px;
  margin: 0 24px;
  padding: 20px 23px;
  overflow: hidden;
  position: relative;
  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  :deep(.van-cell) {
    padding-left: 0;
    padding-right: 0;
  }
  :deep(.van-field__label) {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #2d3748;
  }
  :deep(.van-radio__label) {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2d3748;
  }
  :deep(.van-radio-group) {
    width: 100%;
  }
  :deep(.van-radio--horizontal) {
    margin-right: 0;
  }
  :deep(.van-radio) {
    width: 33.33%;
    padding: 10px 0;
  }
  :deep(.textarea) {
    .van-cell__value {
      background: #efefef;
      border-radius: 13px;
      padding: 16px;
      margin-top: 10px;
    }
  }
}
.submit {
  height: 55px;
  background: #1677ff;
  border-radius: 20px;
}
</style>
