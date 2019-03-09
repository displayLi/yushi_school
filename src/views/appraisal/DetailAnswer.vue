<template>
  <div id="DetailAnswer" ref="changeBottom">
    <!-- 头部 -->
    <Headers titleheader="测评结果"></Headers>

    <!-- 艾森克人格测评结果 -->
    <div v-if="testResult.answer_title" class="Answer-result">
      <h3>{{testResult.answer_title}}</h3>
      <p>{{testResult.answer_content}}</p>
    </div>

    <!--  MBTI职业性格测验结果 -->
    <div v-if="testResult.MBTI_RESULT_TITLE" class="answerResult-infp">
      <p>
        <span>性格类型代码与简述：</span>
        {{testResult.MBTI_RESULT_TITLE}}
      </p>
      <p>
        <span>性格特征：</span>
        {{testResult.MBTI_RESULT_ANSWER}}
      </p>
      <p>
        <span>较适合的职业：</span>
        {{testResult.MBTI_RESULT_OCCU}}
      </p>
      <p>
        <span>较适合的专业：</span>
        {{testResult.MBTI_RESULT_MAJOR}}
      </p>
    </div>

    <!-- 霍兰德职业兴趣测验 -->
    <ul class="work_test_answer" v-if="testResult.work_test_answer">
      <li v-for="(item,index) in testResult.work_test_answer" :key="index">
        <p>{{item}}</p>
      </li>
    </ul>

    <!-- 有图表的那页 -->
    <div v-if="testResult.per_answer">
      <div id="main" style="width: 60%;height:400px; margin:0 auto;"></div>
      <ul class="per_answer">
        <li v-for="(item,index) in testResult.answerList" :key="index">
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import options from "../../common/js/echarts.js";
import echarts from "echarts/dist/echarts";
import Headers from "@/components/Header";
export default {
  name: "DetailAnswer",
  data() {
    return {
      testResult: {},
      echartsData:[],
      echartsName:[]
    };
  },
  created() {
    this.testResult = this.$route.params.testResult || JSON.parse(sessionStorage.testResult);
    if (this.testResult.per_answer) {

       this.echartsData = this.testResult.per_answer.map(el => {
        return {name:el.title,value:el.per}
      })

      this.echartsName = this.testResult.per_answer.map(el => {
        return el.title
      })

    }

  },
  mounted() {
    if (this.testResult.per_answer) {
      this.$nextTick(_ => {
        const echart = echarts.init(document.getElementById("main"));
        options.series[0].data = this.echartsData;
        options.legend.data = this.echartsName;
        echart.setOption(options)

        if (this.testResult.per_answer) {
          this.$refs.changeBottom.style.bottom = 'auto';
        }
      })
    }
    
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#DetailAnswer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../assets/Screenshot.png", cover);
  .Answer-result {
    box-sizing: border-box;
    padding: Rem(108) Rem(23) 0;
    color: #666;
    h3 {
      font-size: Rem(16);
      margin: 0 auto Rem(25);
      text-align: center;
    }
    p {
      font-size: Rem(12);
      text-indent: Rem(25);
    }
  }
  .answerResult-infp {
    box-sizing: border-box;
    padding: Rem(108) Rem(23) 0;
    color: #666;
    font-size: Rem(12);
    p {
      padding: Rem(10) 0;
      span {
        font-weight: bold;
        color: #000;
      }
    }
  }
  .work_test_answer {
    margin-top: Rem(100);
    li {
      box-sizing: border-box;
      padding: 0 Rem(40);
      font-size: Rem(14);
      color: #333;
      p {
        padding: Rem(10) 0;
      }
    }
  }
  .per_answer {
    padding-top: Rem(30);
    li {
      box-sizing: border-box;
      padding: 0 Rem(40);
      font-size: Rem(14);
      color: #333;
      h4 {
        font-size: Rem(16);
      }
      p {
        padding-bottom: Rem(20);
      }
    }
  }
}
</style>