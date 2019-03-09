<template>
  <div id="si">
    <Headers :titleheader="titleFlag == 1 ? '涂鸦' : '畅想' " more="下一步" @click="nextPages"></Headers>
    <div class="icon-font">画</div>
    <p>挑选适合的颜色，任凭自己的记忆或感受的涌现，带着这样的心情尽情绘制属于自己独一无二的曼陀罗吧！</p>
    <div class="img-box" ref="canvasBox" id="canvasBox">
      <v-stage :config="configKonva" ref="stage">
        <v-layer ref="layer">
          <v-image :config="configCircle" ref="draw"></v-image>
        </v-layer>
      </v-stage>
    </div>
    <div class="utils" ref="utilsBox">
      <div class="utils-header" ref="utilsHeader" @click="showutils(showisnone)">
        绘制工具
        <span>
          <img src="../../../assets/utils-more.png" alt ref="icon">
        </span>
      </div>
      <div class="selsector">
        <span @click="selectUtils(1)" :class="{active:hbFlag == 1}">
          画笔
          <img src="../../../assets/hb.png" alt>
        </span>
        <span @click="selectUtils(0)" :class="{active:hbFlag == 0}">
          橡皮
          <img src="../../../assets/xp.png" alt>
        </span>
      </div>
      <div class="utils-line">
        <i></i>
        <p>颜色选择</p>
      </div>
      <div class="color-box">
        <ul>
          <li
            v-for="(item,index) in colorList"
            :key="index"
            :style="'background-color:' + item + ';'"
            @click="SelectColor(item)"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import { Alerts } from "@/common/js/common";
import btnSubmit from "@/components/btnSubmit";
import Vue from "vue";
import VueKonva from "vue-konva";
Vue.use(VueKonva);

export default {
  name: "si",
  data() {
    // 配置数据
    return {
      answer1: "",
      answer2: "",
      titleFlag: 0,
      // 配置canvas的
      configKonva: {
        width: 312,
        height: 312
      },
      // 配置image的
      configCircle: {
        x: 0,
        y: 0,
        image: null,
        width: 312,
        height: 312
      },
      mode: "brush",
      colorList: [
        "#5FB655",
        "#FFF858",
        "#307C22",
        "#ED3231",
        "#7BE9E1",
        "#7BE9E1",
        "#8686F4",
        "#7D8248",
        "#337877",
        "#040203",
        "#853C0F",
        "#E53FF0"
      ],
      ctx: null,
      hbFlag: 1,
      showisnone: true
    };
  },
  methods: {
    // 下一步
    nextSubmit() {
      if (this.answer1 && this.answer2) {
        this.$router.push({
          name: "hua",
          params: {
            answer2: this.answer2,
            answer1: this.answer1
          }
        });
      } else {
        Alerts("输入框不能为空！");
      }
    },
    // 选择颜色
    SelectColor(color) {
      this.ctx.strokeStyle = color;
      this.ctx.globalCompositeOperation = "source-over";
    },
    // 画笔还是橡皮
    selectUtils(flag) {
      this.hbFlag = flag;
      switch (flag) {
        case 0:
          // 橡皮
          this.mode = "eraser";
          this.ctx.globalCompositeOperation = "destination-out";
          break;
        case 1:
          // 画笔
          this.mode = "brush";
          this.ctx.globalCompositeOperation = "source-over";
          break;
      }
    },
    // 显示隐藏工具栏
    showutils(bool) {
      this.showisnone = !this.showisnone;

      const height = this.$refs.utilsBox.offsetHeight;
      const header = this.$refs.utilsHeader.offsetHeight;

      if (!this.showisnone) {
        this.$refs.utilsBox.style.bottom = 0;
        this.$refs.icon.style.transform = "rotate(180deg)";
      } else {
        this.$refs.utilsBox.style.bottom = -(height - header) + "px";
        this.$refs.icon.style.transform = "rotate(0deg)";
      }
    },
    // 下一步
    nextPages() {
      this.$nextTick(e => {
        const dataUrl = document.querySelector("canvas").toDataURL("image/png");
        const files = this.dataURLtoFile(dataUrl, "file");

        sessionStorage.file = JSON.stringify(files);
        sessionStorage.base64 = dataUrl;
        this.$router.push({
          name: "write",
          params: { files, imgurl: dataUrl }
        });
      });
    },
    // file 对象转换
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  },
  created() {
    this.titleFlag = JSON.parse(sessionStorage.item).type;
    // 实例化img对象
    const img = new Image();

    // 赋值source
    if (this.titleFlag == 1) {
      // img.src = sessionStorage.img;     // 正式版
      img.src = "http://0.0.0.0:8200/static/img/beijing.659f40c.png"; // 测试版
    } else {
      img.src = sessionStorage.img; // 畅想的图片
    }

    // 当图片加载时
    img.onload = e => {
      // 创建一个新的canvas 用来画画
      const canvas = document.createElement("canvas");

      this.$nextTick(e => {
        // 赋值canvas 图片 宽高
        this.configKonva.width = this.$refs.canvasBox.offsetWidth;
        this.configKonva.height = this.$refs.canvasBox.offsetHeight;
        this.configCircle.width = this.$refs.canvasBox.offsetWidth;
        this.configCircle.height = this.$refs.canvasBox.offsetHeight;
        this.configCircle.image = canvas; // 把新的实例赋值给 v-image 标签
      });

      // 给新建的canvas赋值宽高
      canvas.height = this.configKonva.height;
      canvas.width = this.configKonva.width;

      // 获取 图片 层 舞台实例
      const image = this.$refs.draw.getStage();
      const layer = this.$refs.layer.getStage();
      const stage = this.$refs.stage.getStage();

      // 设置绘图状态
      var isPaint = false;
      var lastPointerPosition;
      const context = canvas.getContext("2d");
      this.ctx = context;
      context.lineJoin = "round";
      context.lineWidth = 5;
      context.strokeStyle = "#5FB655";

      if (this.titleFlag == 1) {
        document.querySelector("canvas").style.backgroundImage =
          "url('" + img.src + "')";
        document.querySelector("canvas").style.backgroundSize = "100% 100%";
      } else {
        document.querySelector("canvas").style.borderRadius = "50%";
        document.querySelector("canvas").style.overflow = "hidden";
      }

      // 添加图片
      context.drawImage(
        img,
        0,
        0,
        this.configKonva.width,
        this.configKonva.height
      );

      // now we need to bind some events
      // we need to start drawing on mousedown
      // and stop drawing on mouseup
      image.on("mousedown touchstart", function() {
        isPaint = true;
        lastPointerPosition = stage.getPointerPosition();
      });

      // will it be better to listen move/end events on the window?

      stage.addEventListener("mouseup touchend", function() {
        isPaint = false;
      });

      // and core function - drawing
      stage.addEventListener("mousemove touchmove", function() {
        if (!isPaint) {
          return;
        }

        if (this.mode === "brush") {
          // 绘画
          context.globalCompositeOperation = "source-over";
        }
        if (this.mode === "eraser") {
          // 删除
          context.globalCompositeOperation = "destination-out";
        }
        context.beginPath();

        var localPos = {
          x: lastPointerPosition.x - image.x(),
          y: lastPointerPosition.y - image.y()
        };

        context.moveTo(localPos.x, localPos.y);

        var pos = stage.getPointerPosition();

        localPos = {
          x: pos.x - image.x(),
          y: pos.y - image.y()
        };

        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();

        lastPointerPosition = pos;
        layer.batchDraw();
      });
    };
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
  position: absolute;
  top: Rem(43);
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .icon-font {
    margin: Rem(16) auto Rem(24);
    width: Rem(60);
    font-size: Rem(20);
    text-align: center;
    line-height: Rem(60);
    background-color: #ff6762;
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
    width: Rem(312);
    height: Rem(312);
    border: Rem(1) solid #eee;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .utils {
    position: fixed;
    bottom: Rem(-214);
    height: Rem(260);
    transition: 1s all;
    width: 100%;
    background-color: #fff;
    .utils-header {
      font-size: Rem(15);
      background-color: #f3fef3;
      line-height: Rem(45);
      box-sizing: border-box;
      padding-left: Rem(24);
      color: #5fb655;
      border: Rem(1) solid #5fb655;
      span {
        float: right;
        margin-right: Rem(24);
        transition: 1s all;
      }
    }
    .selsector {
      box-sizing: border-box;
      padding: 0 Rem(30);
      span {
        font-size: Rem(12);
        color: #999;
        margin-right: Rem(20);
        img {
          vertical-align: middle;
          filter: grayscale(100%);
          -webkit-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          -ms-filter: grayscale(100%);
          -moz-: grayscale(100%);
        }
      }
    }
    .utils-line {
      position: relative;
      height: Rem(30);
      margin-top: Rem(10);
      p {
        padding: 0 Rem(28);
        font-size: Rem(12);
        text-align: center;
        display: block;
        position: relative;
        width: Rem(120);
        margin: 0 auto;
        z-index: 1;
        color: #5fb655;
        background-color: #fff;
      }
      i {
        position: absolute;
        height: Rem(2);
        width: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #5fb655;
      }
    }
    .color-box {
      ul {
        box-sizing: border-box;
        padding: Rem(10) Rem(20);
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        li {
          margin: Rem(6) Rem(5);
          width: Rem(38);
          height: Rem(38);
        }
      }
    }
  }
}

// 选中样式
.active {
  color: #5fb655 !important;
  img {
    filter: grayscale(0%) !important;
    -webkit-filter: grayscale(0%) !important;
    -o-filter: grayscale(0%) !important;
    -ms-filter: grayscale(0%) !important;
    -moz-: grayscale(0%) !important;
  }
}
</style>