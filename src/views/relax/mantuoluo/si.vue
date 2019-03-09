<template>
  <div id="si">
    <Headers :titleheader="titleFlag == 1 ? '涂鸦' : '畅想' "></Headers>
    <div class="icon-font">思</div>
    <p>彩绘时，请先完成曼陀罗图形一侧的‘绘前思考”，然后观看曼陀罗模版并把手放在模版上，体会画画的意义及所带来的感受。如看模版时，你觉得它像一朵盛开的莲花或翩翩起舞的蝴蝶，那么请体会莲花或蝴蝶带给你的心情。</p>
    <div class="img-box">
      <img :src="img" alt>
    </div>
    <div class="fgx">
      <i></i>
      <p>绘前思考</p>
    </div>
    <div class="textarea">
      <div class="xq">
        <p>1、你现在的心情如何？</p>
        <textarea v-model="answer1"></textarea>
      </div>
      <div class="xq">
        <p>2、今天什么事让你印象深刻？</p>
        <textarea v-model="answer2"></textarea>
      </div>
    </div>
    <div class="btn">
      <btnSubmit width="160" height="45" radius="22.5" :disabled="false" @click="nextSubmit">下一步</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import { Alerts } from "@/common/js/common";
import btnSubmit from "@/components/btnSubmit";
export default {
  name: "si",
  data() {
    return {
      answer1: "",
      answer2: "",
      titleFlag: 0,
      img: ""
    };
  },
  methods: {
    nextSubmit() {
      if (this.answer1 && this.answer2) {
        this.$router.push({
          name: "hua",
          params: {
            answer2: this.answer2,
            answer1: this.answer1
          }
        });

        sessionStorage.answer = JSON.stringify({answer2: this.answer2,answer1: this.answer1})
      } else {
        Alerts("输入框不能为空！");
      }
    }
  },
  created() {
    this.titleFlag = JSON.parse(sessionStorage.item).type;
    this.img = sessionStorage.img;
  },
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#si {
  padding-top: Rem(43);
  background-color: #fff;
  .icon-font {
    margin: Rem(16) auto Rem(24);
    width: Rem(60);
    font-size: Rem(20);
    text-align: center;
    line-height: Rem(60);
    background-color: #6abbff;
    border-radius: 50%;
    color: #fff;
  }
  p {
    box-sizing: border-box;
    padding: 0 Rem(28) Rem(37);
    line-height: Rem(24);
    color: #666;
    font-size: Rem(15);
  }
  .img-box {
    margin: Rem(10) auto;
    width: Rem(150);
    height: Rem(150);
    border: Rem(1) solid #eee;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .fgx {
    text-align: center;
    position: relative;
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
      width: 80%;
      height: Rem(2);
      background-color: #5fb655;
    }
    p {
      margin: Rem(20) 0;
      padding: 0 Rem(19);
      width: Rem(100);
      background-color: #fff;
      color: #5fb655;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
  .textarea {
    color: #666;
    box-sizing: border-box;
    padding: Rem(20);
    p {
      margin-bottom: Rem(21);
      padding: 0;
    }
    textarea {
      width: 100%;
      height: Rem(60);
      box-sizing: border-box;
      padding: Rem(6);
      border: Rem(1) solid #eee;
      outline: none;
    }
  }
  .btn {
    text-align: center;
    padding-bottom: Rem(30);
  }
}
</style>