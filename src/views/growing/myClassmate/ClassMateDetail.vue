<template>
  <div id="classMateDetail">
    <Headers titleheader="私信"></Headers>
    <div class="detail-container">
      <div class="avatar">
        <img :src="classMateDetail.icon" alt>
      </div>
      <p class="name">{{classMateDetail.real_name}}</p>
      <p class="school">
        {{classMateDetail.schoolName}}
        {{classMateDetail.className}}
      </p>
    </div>
    <form>
      <ul>
        <li>
          <label for="1">昵称:</label>
          <input disabled id="1" :value="classMateDetail.name" type="text">
        </li>
        <li>
          <label for="2">星座:</label>
          <input disabled id="2" :value="classMateDetail.constellation" type="text">
        </li>
        <li>
          <label for="3">生日:</label>
          <input disabled id="3" :value="classMateDetail.birthdate" type="text">
        </li>
        <li>
          <label for="4">邮箱:</label>
          <input disabled id="4" :value="classMateDetail.email" type="text">
        </li>
      </ul>
    </form>
    <div class="gotolt">
      <btnSubmit style="width:100%;" height="45" :disabled="false" @click="gotoMsg">发私信</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "classMateDetail",
  data() {
    return {
      classMateDetail: {}
    };
  },
  methods: {
    gotoMsg() {
      console.log("发私信");
      this.$router.push({ name: "connectStu", item: this.classMateDetail });
    }
  },
  created() {
    this.classMateDetail =
      this.$route.params.item || JSON.parse(sessionStorage.user);
  },
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#classMateDetail {
  position: absolute;
  top: Rem(43);
  width: 100%;
  bottom: 0;
  background-color: #fff;
  .detail-container {
    height: Rem(220);
    position: relative;
    @include bgImg("../../../assets/user-bg.png", contain);
    .avatar {
      width: Rem(60);
      height: Rem(60);
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: Rem(50);
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      padding-top: Rem(130);
    }
    .name,
    .school {
      text-align: center;
      font-size: Rem(16);
      color: #fff;
    }
    .school {
      margin-top: Rem(11);
      font-size: Rem(14);
    }
  }
  form {
    box-sizing: border-box;
    padding: Rem(16) Rem(12);
    ul {
      li {
        border-bottom: Rem(1) solid #eee;
        label {
          font-size: Rem(14);
          color: #666;
        }
        input {
          border: 0;
          background-color: transparent;
          padding: Rem(10) 0 Rem(0) 0;
          color: #666;
          width: 80%;
          outline: none;
        }
      }
    }
  }
  .gotolt {
    box-sizing: border-box;
    padding: Rem(14);
  }
}
</style>