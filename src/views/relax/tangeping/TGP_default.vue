<template>
  <div id="TGP_default">
    <Headers titleheader="弹个瓶"></Headers>
    <!-- 导航 -->
    <div class="tgp-nav">
      <ul>
        <li @click="throws">扔一个</li>
        <li @click="scoop">捞一个</li>
        <li @click="$router.push('/my_bottle')">我的瓶子</li>
      </ul>
    </div>
    <!-- 扔出去 -->
    <div id="throw_Tgp" v-if="throwsFlag">
      <div class="tgp-throws popupLayer" @click="closeLayer">
        <textarea :disabled="disabled" v-model="tgpText"></textarea>
      </div>
      <button v-if="!replyAndThrow" class="tgpBottom-btn" @click="submitTGP('提交成功')">扔出去</button>
    </div>
    <!-- 回复和扔回去按钮 -->
    <div class="tgpBtn-box" v-if="replyAndThrow">
      <button @click="tapRhq">扔回去</button>
      <button>
        <router-link to="/fangsong">回应</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import {Alerts} from "@/common/js/common"    //  封装的message提示
import Headers from "@/components/Header";
export default {
  name: "tgp_default",
  data() {
    return {
      tgpText: "", // 文本
      throwsFlag: false, // 抛出去弹层状态
      disabled: false, // input 框disable状态
      replyAndThrow: false, // 回复、扔出去、扔回去 三个按钮显示状态
      throwPLP:''
    };
  },
  methods: {
    // 显示弹出层
    throws() {
      this.throwsFlag = true; // 显示弹层
      this.disabled = false; // 关闭disabled
    },

    // 扔出去btn
    /**
     * 两个参数
     * 第一个 提交之后所回复的话
     * 第二个参数如果是回复就传，新加就传空
     */
    submitTGP(msg, id = "") {
      if (this.tgpText && this.tgpText.trim()) {
        let userId = JSON.parse(sessionStorage.userInfo).id; // 获取当前用户 userId

        // 提交回复
        this.axios
          .post("/interest/replyBottle", {
            userId,
            id,
            content: this.tgpText
          })
          .then(res => {
            // 提示消息
            Alerts(msg);
            // 成功后关闭弹层
            this.throwsFlag = false;
            // 并且清除文本内容
            this.tgpText = "";
          });
      } else {
        // 如果没填写或者去空格后还是空执行以下提示
        Alerts("漂流瓶内容不能为空!");
      }
    },
    // 关闭弹出层
    closeLayer({ target: { nodeName } }) {
      if (nodeName.toLowerCase() !== "textarea") {
        this.throwsFlag = false;
        this.replyAndThrow = false;
        this.tgpText = ""; // 关闭弹出层清除内容
      } else {
        this.throwsFlag = true;
      }
    },

    // 捞一个按钮
    scoop() {
      //  请求接口获取漂流瓶
      this.axios.post("/interest/getBottle").then(res => {
        if (res.status == 0) {
          //  隐藏扔出去的按钮
          this.replyAndThrow = true;
          //  显示弹出层
          this.throws();
          // 设置disabled只读
          this.disabled = true;
          // 获取到漂流瓶的内容赋值给textarea
          this.throwPLP  = res.id;   // 漂流瓶的id
          this.tgpText = res.content;
        } else {
          Alerts("没有捞到哦~");
        }
      });
    },

    // 扔回去
    tapRhq() {
      this.axios.post('/interest/throwBack',{id:this.throwPLP})
          .then(res => {
            this.throwsFlag = false;
            this.replyAndThrow = false;
            Alerts("已扔回到海里~");
          })
          .catch(err => console.log(err));
    }
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#TGP_default {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../../assets/tgp-bg.png", cover);
  .tgp-nav {
    width: 100%;
    position: absolute;
    bottom: Rem(101);
    ul {
      display: flex;
      justify-content: space-around;
      li {
        font-size: Rem(12);
        color: #fff;
        padding: Rem(6) Rem(14);
        border-radius: Rem(21);
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  .tgp-throws {
    box-sizing: border-box;
    padding: Rem(95) Rem(13) Rem(30);
    textarea {
      width: 100%;
      height: Rem(375);
      outline: none;
      border-radius: Rem(10);
      box-sizing: border-box;
      padding: Rem(30);
      font-size: Rem(13);
      background-color: #fff7db;
    }
  }
  .tgpBottom-btn {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
    z-index: 1;
    color: #fff;
    height: Rem(45);
    font-size: Rem(15);
    background-color: #5eb754;
    border: 0;
  }
  .tgpBtn-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 Rem(13);
    margin: Rem(30) 0;
    position: absolute;
    bottom: Rem(77);
    display: flex;
    justify-content: space-around;
    button {
      font-size: Rem(15);
      color: #fff;
      border: 0;
      background-color: #5fb655;
      width: Rem(160);
      height: Rem(45);
      a {
        color: #fff;
      }
    }
  }
}
</style>