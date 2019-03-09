<template>
  <div id="serviceCenter">
    <Headers titleheader="客服中心"></Headers>
    <!-- 联系方式 -->
    <ul class="contact-details">
      <li>
        <span>客服微信</span>
        <span @click="copyText(contactDetail.weixin)" class="detail">{{contactDetail.weixin}}</span>
      </li>
      <li>
        <span>客服电话</span>
        <span @click="copyText(contactDetail.phone)" class="detail">{{contactDetail.phone}}</span>
      </li>
      <li>
        <span>客服邮箱</span>
        <span @click="copyText(contactDetail.email)" class="detail">{{contactDetail.email}}</span>
      </li>
    </ul>
    <!-- 选项 -->
    <div class="selector">
      <NavList name="常见问题" path="/problem" :returns="true"></NavList>
      <NavList name="意见反馈"  path="/feedback" :returns="true"></NavList>
    </div>
    
    <!-- 复制用的input -->
    <input type="text" ref="inputs" style="margin-left:9999999px;">
  </div>
</template>

<script>
import Headers from "@/components/Header";
import NavList from "@/components/NavList";
import { Alerts } from "@/common/js/common.js";
export default {
  name: "serviceCenter",
  data() {
    return {
      contactDetail:{}
    };
  },
  methods: {
    copyText(val) {
        let oInput = this.$refs.inputs;
        oInput.value = val;
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        Alerts('复制成功!');
    }
  },
  created() {
    this.axios('/teacher/getSystemDetail')
      .then(res => {
        this.contactDetail = res;
        console.log(res);
      })
  },
  components: {
    Headers,
    NavList
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#serviceCenter {
  padding-top: Rem(43);
  width: 100%;
  overflow: hidden;
  .contact-details {
    background-color: #fff;
    li {
      border-bottom: Rem(1) solid #EEEEEE;
      font-size: Rem(15);
      padding: Rem(18) 0 Rem(13);
      margin-left: Rem(15);
      .detail {
        color: #999999;
        float: right;
        margin-right: Rem(12);
      }
      span {
        display: inline-block;
        color: #333;
        margin-left: 0;
        text-align: left;
      }
    }
  }
  .selector {
    margin-top: Rem(15);
    background-color: #fff;
  }
}
</style>