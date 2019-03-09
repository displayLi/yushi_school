<template>
  <div id="Answer" ref="answer">
    <Headers titleheader="专业测评"></Headers>
    <div class="answer-content">
      <!-- 判断题目的类型是不是一样的 -->
      <!-- 艾森克人格测试 和 MBTI职业性格测验 -->
      <ul v-if="$route.params.type == 1 || $route.params.type == 2 || $route.params.type == 5">
        <li
          v-for="(item,index) in answerData.questionList"
          :key="index"
          v-show="answerFlag == index"
        >
          <!-- 题目类型 -->
          <span class="answer-type">单选题</span>
          <div class="answer-ti">
            <span>{{answerFlag + 1}}/{{answerData.questionList.length}}</span>
            <span>{{item.context || item.title}}</span>
          </div>

          <!-- 选项 -->
          <div class="mint-radios">
            <!-- 埃森克人格测试选项 -->
            <mt-radio
              v-if="$route.params.type == 1 || $route.params.type == 2"
              :options="options "
              @change="getVal($event,index)"
            ></mt-radio>

            <!-- MBTI职业性格测验选项 -->
            <mt-radio
              v-if="$route.params.type == 5"
              :options="[{label:item.selectA,value:'1'},{label:item.selectB,value:'0'}]"
              @change="getVal($event,index)
              "
            ></mt-radio>
          </div>
        </li>
      </ul>

      <!-- 霍兰德职业兴趣测验 -->
      <ul class="zycs" v-if="$route.params.type == 3">
        <li
          v-for="(item,index) in answerData.questionList"
          :key="index"
          v-show="answerFlag == index"
        >
          <!-- 题目类型 -->
          <span class="answer-type">分数题</span>
          <div class="answer-ti">
            <span>{{answerFlag + 1}}/{{answerData.questionList.length}}</span>
            <span>{{item.title}}（以下各分项选填的分数合计必须25分）</span>
          </div>

          <!-- 选项 -->
          <div class="mint-selsect" v-for="(data,index) in item.question" :key="index">
            <select @change="getSelectVal(index,$event)">
              <option v-for="(num,index) in 26" :key="index" :value="index">{{index}}分</option>
            </select>
            <svg
              t="1550041018752"
              class="icon"
              style
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1092"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200"
              height="200"
            >
              <path
                d="M878.592 250.88q29.696 0 48.128 11.264t24.576 29.696 0 41.472-26.624 45.568q-82.944 92.16-159.744 180.224t-148.48 164.864q-19.456 20.48-45.568 31.744t-53.76 11.776-53.248-8.704-43.008-28.672q-39.936-44.032-82.944-90.112l-88.064-92.16q-43.008-46.08-85.504-90.624t-79.36-86.528q-17.408-19.456-22.528-40.448t1.024-38.4 23.552-28.672 45.056-11.264q35.84 0 98.816-0.512t137.728-0.512l153.6 0 150.528 0 125.952 0 79.872 0z"
                p-id="1093"
                fill="#000000"
              ></path>
            </svg>
            <span>{{data.context}}</span>
          </div>
        </li>
      </ul>

      <!-- 多元智能测验 -->
      <ul v-if="$route.params.type == 4">
        <li v-for="(item,index) in DYZNTestData" :key="index" v-show="answerFlag == index">
          <!-- 题目类型 -->
          <span class="answer-type">单选题</span>
          <div class="answer-ti">
            <span>{{answerFlag + 1}} /{{DYZNTestData.length}}</span>
            <span>{{item.context || item.title.substr(2)}}</span>
          </div>

          <!-- 选项 -->
          <div class="mint-selsect">
            <mt-radio
              v-if="$route.params.type == 4 && index < (DYZNTestData.length - imgTotals)"
              :options="options"
              @change="getVal($event,index)"
            ></mt-radio>
            
            <!-- 图片选项 -->
            <div v-else class="imgRadio">
              <img class="title-big-img" :src="item.titleImg" alt="标题图">

              <!-- mint ui 不支持slot插槽和template 模板 图片部分的选项只能自定义 -->
             <form 
              class="styleRadio" 
              @change="getVal($event,index)" 
              v-if="
                item.answerA &&
                item.answerB && 
                item.answerC && 
                item.answerD"
              >

               <!-- A -->
                <input :id="index" type="radio" name="Data" value="A">
                <label :for="index">
                  <img v-if="item.answerA.length > 4" :src="item.answerA" alt>
                  <span v-if="item.answerA.length <= 4">{{item.answerA}}</span>
                </label>
                <!-- B -->
                <input :id="index + 1" type="radio" name="Data" value="B">
                <label :for="index + 1">
                  <img v-if="item.answerB.length > 4" :src="item.answerB" alt>
                  <span v-if="item.answerB.length <= 4">{{item.answerB}}</span>
                </label>
                <br />
                <!-- C -->
                <input :id="index + 2" type="radio" name="Data" value="C">
                <label :for="index + 2">
                  <img v-if="item.answerC.length > 4" :src="item.answerC" alt>
                  <span v-if="item.answerC.length <= 4">{{item.answerC}}</span>
                </label>
                <!-- D -->
                <input :id="index + 3" type="radio" name="Data" value="D">
                <label :for="index + 3">
                  <img v-if="item.answerD.length > 4" :src="item.answerD" alt>
                  <span v-if="item.answerD.length <= 4">{{item.answerD}}</span>
                </label>
             </form>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 按钮 -->
    <div class="btnsubmit" v-if="answerData.questionList">
      <btnSubmit
        @click="prevAnswer"
        v-if="answerFlag"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >上一题</btnSubmit>

      <btnSubmit
        v-if="(answerData.questionList.length - 1) != answerFlag"
        @click="nextAnswer"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >下一题</btnSubmit>

      <btnSubmit
        v-if="(answerData.questionList.length - 1) == answerFlag"
        @click="PostAnswerSubmit"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >提交</btnSubmit>
    </div>

    <!-- 职业测试按钮 辣鸡按钮合在一个里面不好使 -->
    <div class="btnsubmit" v-if="DYZNTestData && $route.params.type == 4">
      <btnSubmit
        @click="prevAnswer"
        v-if="answerFlag"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >上一题</btnSubmit>

      <btnSubmit
        v-if="(DYZNTestData.length - 1) != answerFlag"
        @click="nextAnswer"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >下一题</btnSubmit>

      <btnSubmit
        v-if="(DYZNTestData.length - 1) == answerFlag"
        @click="SubmitImgDatas"
        width="160"
        height="45"
        :disabled="false"
        radius="22.5"
      >提交</btnSubmit>
    </div>
  </div>
</template>

<script>
// 引入 radio 组件
import { Radio } from "mint-ui";
import Vue from "vue";
Vue.component("mt-radio", Radio);

import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import { Alerts } from "@/common/js/common";
export default {
  name: "answer",
  data() {
    return {
      answerData: {},
      answerFlag: 0,
      value: "",
      options: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      radioAnswer: [],
      selectAnswer: [],
      postSelectArr: [],
      DYZNTestData: [],
      imgTotals: 0,
      imgAnswerData: []
    };
  },
  components: {
    Headers,
    btnSubmit
  },
  methods: {
    // 下一题
    nextAnswer() {
      // 判断类型
      switch (this.$route.params.type) {
        case "1": // 艾森克人格测验（15岁以上）
        case "2": // 艾森克人格测验（15岁以下）
        case "5": // MBTI 职业性格测验
          this.buildMethods(this.answerData.questionList.length);
          break;
        case "3": // 霍兰德职业兴趣测验
          let a = 0;
          // 计算数组里面的和
          this.selectAnswer.forEach(el => {
            a += Number(el);
          });

          // 如果是25 那么先用逗号分隔小题 然后在添加到答案的数组中
          if (a == 25) {
            this.answerFlag++; // 该参数++ 会跳转下一页
            this.postSelectArr[this.answerFlag - 1] = this.selectAnswer.join(
              ","
            );
            this.selectAnswer.fill(0); // 往答案的数组添加完之后恢复默认 值 方便下次使用
          }

          if (this.postSelectArr.length > this.answerFlag) {
            this.answerFlag++; // 判断如果答完题 返回上一步之后记录答题到那个位置 然后在这期间任意上一页下一页
          }
          // 动态改变第四页的bottom值否则会显示不全的问题
          this.answerFlag >= 3
            ? (this.$refs.answer.style.bottom = "auto")
            : (this.$refs.answer.style.bottom = 0);
          break;

        case "4": // 多元智能测验
          this.buildMethods(this.DYZNTestData.length);
          // 你能看懂嘛
          this.answerFlag > 57 
            ? (this.answerFlag == 62 || this.answerFlag == 64 ? this.$refs.answer.style.bottom = 0 : this.$refs.answer.style.bottom = "auto")
            : ( this.$refs.answer.style.bottom = 0);
          break;
      }
    },
    // 封装的判断
    buildMethods(data) {
      if (this.answerFlag < data - 1) {
        if (this.radioAnswer.length >= this.answerFlag + 1) {
          this.answerFlag++;
        } else {
          Alerts("请先答题在进行下一步操作！");
        }
      }
    },
    // 提交按钮 再次筛选调用公共请求函数
    PostAnswerSubmit() {
      let type =
        this.$route.params.type || JSON.parse(sessionStorage.paramsData).type; // 获取url传过来的type
      switch (type) {
        case "1":
        case "2":
        case "5":
          const answer = this.radioAnswer.join(""); // 把数组转换成字符串并用逗号分隔发送给后台
          this.postAnswer(type, answer); // 调用post方法
          break;

        case "3":
          const answers = this.postSelectArr.join("-"); // 把数组转换成字符串并用逗号分隔发送给后台
          this.postAnswer(type, answers); // 调用post方法
          break;
      }
    },
    // 上一题
    prevAnswer() {
      if (this.answerFlag > 0) {
        this.answerFlag--;
      }
    },
    // 获取radio的值添加到数组
    getVal(data, index) {
      // 57 题数 当然也可以改成数组的length
      if (this.$route.params.type == '4' && this.answerFlag > 57) {
        this.radioAnswer[index] = data.target.value;
      }else {
        this.radioAnswer[index] = data;
        this.$refs.answer.style.bottom = 0
      }
      
    },
    // 提交答案
    postAnswer(type, answer) {
      this.axios.post("/interest/addAnswer", { type, answer }).then(res => {
        sessionStorage.testResult = JSON.stringify(res);
        this.$router.replace({
          name: "DetailAnswer",
          params: { testResult: res }
        });
      });
    },
    // 霍兰德职业兴趣测验 select选择
    getSelectVal(
      index,
      {
        target: { value }
      }
    ) {
      this.selectAnswer[index] = Number(value);
    },
    // 多元测试提交答案
    SubmitImgDatas() {
      if (this.radioAnswer.length) {
        let answer = this.radioAnswer.join('')
        this.postAnswer(this.$route.params.type, answer)
      }
      
    }
  },
  created() {
    // 获取动态路由的params
    let postTypes =
      this.$route.params.type || JSON.parse(sessionStorage.paramsData).type;
    this.axios
      .post("/interest/getQuestions", { type: postTypes })
      .then(res => {
        if (res.questionList1) {
          this.DYZNTestData = [
            ...res.questionList1,
            ...res.questionList2,
            ...res.image_title
          ];
          this.imgTotals = res.image_title.length;
        }else {
          this.answerData = res; // 获取题目
        }
      })
      .then(_ => {
        // 给空数组赋值length 此处必须得判断不判断直接赋值的话会报错
        /**
         *
         *    Answer.vue?2fd0:232 Uncaught (in promise) TypeError: Cannot read property '0' of undefined
         *    at eval (VM27508 Answer.vue:251)
         *
         * */

        if (this.answerData.questionList && this.$route.params.type == "3")
          this.selectAnswer.length = this.answerData.questionList[0].question.length;

        // es6 方法 给空数组默认的值补位
        this.selectAnswer.fill(0);
        this.postSelectArr.fill(0);
      });
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#Answer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../assets/Screenshot.png", cover);
  .answer-content {
    padding-top: Rem(60);
    ul {
      li {
        .answer-type {
          display: block;
          text-align: center;
          margin: Rem(47) auto Rem(39);
          font-size: Rem(12);
          color: #fff;
          width: Rem(51);
          line-height: Rem(21);
          background-color: #5fb655;
          border-radius: Rem(14);
        }
        .answer-ti {
          font-size: Rem(15);
          color: #333;
          box-sizing: border-box;
          padding: 0 Rem(40);
          margin: 0 auto;
          height: Rem(60);
        }
        .mint-radios {
          box-sizing: border-box;
          padding: 0 Rem(20);
        }
        .mint-selsect {
          box-sizing: border-box;
          padding: Rem(5) Rem(30);
          font-size: 0;
          position: relative;
          select {
            display: inline-block;
            border: Rem(1) solid #000;
            outline: none;
            width: Rem(60);
            background-color: transparent;
            position: relative;
            margin-right: Rem(10);
            vertical-align: top;
          }
          span {
            display: inline-block;
            width: 70%;
            font-size: Rem(12);
            color: #333;
          }
          svg {
            position: absolute;
            top: Rem(10);
            left: Rem(70);
            width: Rem(10);
            height: Rem(10);
          }
          .imgRadio {
            text-align: center;
            .title-big-img {
              width: Rem(80);
              height: Rem(80);
              object-fit: contain;
            }
            .styleRadio {
              margin-top: Rem(20);
              input {
                width: Rem(20);
                height: Rem(20);
                display: inline-block;
                vertical-align: middle;
              }
              label {
                display: inline-block;
                vertical-align: middle;
                margin: Rem(10);
                img {
                  width: Rem(100);
                  height: Rem(100);
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
    }
  }
  .btnsubmit {
    text-align: center;
    button {
      display: block;
      margin: Rem(52) auto Rem(25);
    }
    button:nth-of-type(2) {
      margin-top: 0;
    }
  }
}
</style>