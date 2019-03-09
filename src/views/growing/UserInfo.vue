<template>
  <div id="userInfo">
    <Headers titleheader="个人资料"></Headers>
    <div class="userinfo">
      <div class="avatar">
        <img :src="userInfo.icon" alt>
      </div>
      <form class="user-content">
        <input type="text" placeholder="昵称" v-model="user.nickName">
        <input type="text" placeholder="邮箱" v-model="user.email">
        <div @click="openDateTime">
          <input type="text" v-model="user.birthdate" placeholder="出生日期">
          <mt-datetime-picker ref="picker" type="date" @confirm="handleConfirm"></mt-datetime-picker>
        </div>
        <input type="text" v-model="user.constellation" placeholder="星座">
      </form>
      <btnSubmit style="width:100%" height="45" @click="userSubmit" :disabled="false">确定</btnSubmit>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { DatetimePicker } from "mint-ui";
var formData = new FormData();

import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "userInfo",
  data() {
    return {
      user: {
        nickName: "",
        email: "",
        birthdate: "",
        constellation: ""
      },
      userInfo: ""
    };
  },
  methods: {
    openDateTime() {
      this.$refs.picker.open();
    },
    handleConfirm(val) {
      let dates = getDate.format(val, "yyyy-MM-dd");
      this.user.birthdate = dates;
      this.$nextTick(_ => {
        this.$refs.picker.close();
      });
    },
    // 提交修改的个人信息
    userSubmit() {
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

      // 判断邮箱格式是否正确 如果正确或为空 往下进行 验证出生日期是不是没有值 如果没有值提示用户 有值进行
      (reg.test(this.user.email) || this.user.email == "") &&
      this.user.birthdate
        ? this.postMsg()
        : Alerts("选项输入有误！出生日期为必填项");
    },
    postMsg() {
      // 往对象中append
      formData.append("nickName", this.user.nickName);
      formData.append("email", this.user.email);
      formData.append("birthdate", this.user.birthdate);
      formData.append("constellation", this.user.constellation);

      this.axios.post("/api/editProfile", formData).then(res => {
        if (res.userInfo) {
          sessionStorage.userInfo = JSON.stringify(res.userInfo);
          Alerts("修改成功！");
          setTimeout(_ => {
            this.$router.push("/chengzhang");
          }, 500);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(_ => {
      // mint ui 关闭不好使自己写
      document.addEventListener("click", ({ target }) => {
        if (target.innerHTML == "取消" || target.className == "v-modal")
          this.$refs.picker.close();
      });
    });
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.userInfo);
    this.user.birthdate = this.userInfo.birthdate;
    this.user.nickName = this.userInfo.nick_name;
    this.user.constellation = this.userInfo.constellation;
    this.user.email = this.userInfo.email;
  },
  components: {
    Headers,
    btnSubmit,
    "mt-datetime-picker": DatetimePicker
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#userInfo {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #fff;
  .userinfo {
    box-sizing: border-box;
    padding: Rem(43) Rem(23);
    .avatar {
      width: Rem(65);
      height: Rem(65);
      margin: Rem(35) auto Rem(25);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .user-content {
      input {
        display: block;
        width: 100%;
        border: Rem(1) solid #eee;
        font-size: Rem(15);
        box-sizing: border-box;
        padding: Rem(12) Rem(13);
        margin-bottom: Rem(11);
        outline: none;
      }
    }
  }
}
</style>