<template>
  <div id="DCdt">
    <Headers titleheader="问卷调查"></Headers>
    <div class="dt_container" v-if="!isSuccess">
      <div v-for="(item,index) in anwser" :key="index" v-if="tabNum == index">
        <p>
          <strong>试题</strong>
          {{index + 1}} / {{anwser.length}}
        </p>
        <div class="dt_title">{{item.title}}({{item.choose == 1 ? "单选" : "多选"}})</div>
        <!-- 单选 -->
        <mt-radio
          v-if="item.choose == 1"
          align="right"
          :options="item.option"
          v-model="item.option.value"
          @change="selsectArr($event,index)"
        ></mt-radio>
        <!-- 多选 -->
        <div class="checkbox" v-for="(val,key) in item.option" :key="key" v-if="item.choose == 2">
          <label :for="key">{{val.label}}</label>
          <input :id="key" @click="Allselsector(val.value,index,key)" type="checkbox">
        </div>
      </div>
    </div>
    <div class="submitBtn" v-if="!isSuccess">
      <button v-if="!tabNum" class="next_t" :class="{selector:indexFlag}" @click="nextT">下一题</button>
      <div v-if="tabNum">
        <button @click="prevBtn" class="prevBtn selector">上一题</button>
        <button
          v-if="daan.length != anwser.length"
          @click="nextBtn"
          class="nextBtn"
          :class="{selector:indexFlag}"
        >下一题</button>
        <button v-if="daan.length == anwser.length" @click="submitBtn" class="nextBtn selector">提交</button>
      </div>
    </div>
    <div v-if="isSuccess" class="success">
      <p>
        <img src="../../../assets/success-icon.png" alt>
      </p>
      <p class="text">提交成功！</p>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import { Radio } from "mint-ui";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "DCdt",
  data() {
    return {
      anwser: [],
      tabNum: 0,
      daan: [],
      indexFlag: false,
      isSuccess: 0,
      dxArr: []
    };
  },
  methods: {
    selsectArr(val, index) {
      this.daan[index] = index + 1 + ":" + val;
      this.tabNum = index;
      this.indexFlag = true;
    },
    nextT() {
      this.nextSelectRadio();
      this.dxArr = [];
    },
    prevBtn() {
      this.tabNum--;
      this.indexFlag = true;
    },
    nextBtn() {
      this.nextSelectRadio();
    },
    nextSelectRadio() {
      if (this.indexFlag) {
        this.tabNum++;
        this.indexFlag = false;
      } else {
        Alerts("请打完本题在进行下一步操作~");
      }
    },
    submitBtn() {
      let user = JSON.parse(sessionStorage.userInfo);
      this.axios
        .post("/friend/saveDati", {
          answer: this.daan,
          type: user.role_type,
          gradeName: user.class_name,
          schoolName: user.school_name,
          gender: user.gender
        })
        .then(res => {
          this.isSuccess = 1;
        })
        .catch(err => Alerts("网络问题，请稍后再试~"));
    },
    Allselsector(val, index, key) {
      if (this.dxArr.length == 0) {
        this.dxArr.push(val);
      } else {
        const isFind = this.dxArr.findIndex(el => el == val);
        if (isFind == -1) {
          this.dxArr.push(val);
        } else {
          this.dxArr.splice(isFind, 1);
        }
      }

      if (this.dxArr.length >= 3) {
        let dxt = this.dxArr.join(",");
        this.daan[index] = index + 1 + ":" + dxt;
        this.indexFlag = true;
        console.log(this.daan);
      } else {
        this.indexFlag = false;
        Alerts("至少要选三个选项！");
        return false;
      }
    }
  },
  created() {
    this.axios.post("/friend/getDatiList").then(res => {
      // 这个数据结构 哎 不想说什么 就不能是个数组嘛  我还得遍历成数组
      res.forEach((item, index) => {
        res[index].option = Object.values(item.option).map(el => {
          return { label: el, value: el.substr(0, 1) };
        });
      });

      this.anwser = res;
    });
  },
  components: {
    Headers,
    btnSubmit,
    "mt-radio": Radio
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#DCdt {
  position: absolute;
  top: Rem(43);
  width: 100%;
  bottom: 0;
  background-color: #fff;
  .dt_container {
    box-sizing: border-box;
    padding: Rem(20) Rem(18);
    color: #333;
    div {
      p {
        font-size: Rem(16);
      }
      .dt_title {
        margin: Rem(29) 0 Rem(36);
        font-size: Rem(16);
      }
      .checkbox {
        font-size: Rem(15);
        color: #333;
        height: Rem(40);
        padding-right: Rem(10);
        input {
          display: inline-block;
          float: right;
          text-align: right;
          width: Rem(20);
          height: Rem(20);
        }
      }
    }
  }
  .submitBtn {
    text-align: center;
    .next_t {
      width: Rem(225);
      height: Rem(45);
      background-color: #dbdbdb;
      color: #fff;
      font-size: Rem(15);
      outline: none;
      border: 0;
    }
    div {
      button {
        width: Rem(140);
        height: Rem(45);
        border: 0;
        color: #fff;
        border-radius: Rem(5);
        font-size: Rem(15);
        outline: none;
      }
    }
  }
  .success {
    padding-top: Rem(77);
    text-align: center;
    p {
      width: Rem(98);
      height: Rem(98);
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      font-size: Rem(15);
      color: #333;
      padding-top: Rem(34);
    }
  }
}
.selector {
  background-color: #ff683e !important;
}
</style>
