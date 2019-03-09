<template>
  <div id="write">
    <Headers :titleheader="titleFlag == 1 ? '涂鸦' : '畅想' "></Headers>
    <div class="icon-font">写</div>
    <p>完成曼陀罗绘制后，可以尝试从不同角度来欣赏自己的作品，体会它带来的心情及联想，并按照一侧“绘后思考”写出你想要表达的内容和记忆</p>
    <div class="img-box">
      <img :src="img" :style="titleFlag == 2 ? 'border-radius:50%;' : 'border-radius:0;'" alt>
    </div>
    <div class="fgx">
      <i></i>
      <p>绘后思考</p>
    </div>
    <div class="textarea">
      <div class="xq">
        <p>1、请给你的作品取一个名字？</p>
        <textarea v-model="answer3"></textarea>
      </div>
      <div class="xq">
        <p>2、你的作品让你联想到什么？</p>
        <textarea v-model="answer4"></textarea>
      </div>
    </div>
    <div class="btn">
      <btnSubmit width="160" height="45" radius="22.5" :disabled="false" @click="nextSubmit">完整保存</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import { Alerts } from "@/common/js/common";
import btnSubmit from "@/components/btnSubmit";

const formData = new FormData();

export default {
  name: "write",
  data() {
    return {
      answer4: "",
      answer3: "",
      titleFlag: 0,
      img: "",
      file: null,
      answer: {},
      did: 0
    };
  },
  methods: {
    nextSubmit() {
      if (this.answer3 && this.answer4) {
        // formData append data
        if (this.titleFlag == 1) {
          formData.append("file", this.file);
          formData.append("answer1", this.answer.answer1);
          formData.append("answer2", this.answer.answer2);
          formData.append("answer3", this.answer3);
          formData.append("answer4", this.answer4);
          formData.append("did", this.did);
        } else {
          formData.append("file", this.file);
          formData.append("answer3", this.answer3);
          formData.append("answer4", this.answer4);
          formData.append("did", this.did);
        }

        this.axios.post("/interest/addManZuoPin", formData).then(res => {
          Alerts("保存成功!");
          this.$router.push("/mywork");
        });
      } else {
        Alerts("输入框不能为空！");
      }
    }
  },
  created() {
    this.titleFlag = JSON.parse(sessionStorage.item).type;
    this.img = this.$route.params.imgurl || sessionStorage.base64;
    this.file = this.$route.params.files || sessionStorage.file;
    this.answer = JSON.parse(sessionStorage.answer);
    this.did = JSON.parse(sessionStorage.item).id;

    // 先清空formData

    formData.delete("file");
    formData.delete("answer1");
    formData.delete("answer2");
    formData.delete("answer3");
    formData.delete("answer4");
    formData.delete("did");
  },
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#write {
  padding-top: Rem(43);
  background-color: #fff;
  .icon-font {
    margin: Rem(16) auto Rem(24);
    width: Rem(60);
    font-size: Rem(20);
    text-align: center;
    line-height: Rem(60);
    background-color: #f7ce08;
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