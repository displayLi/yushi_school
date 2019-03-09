<template>
  <div class="box_cont">
    <div id="test">
      <ul>
        <li class="test-list" v-for="(item,index) in navLists" :key="index">
          <router-link :to="{name:item.path,params:{titles:item.titles,details:item.details,type:item.type}}">
            <div class="test-list-item">
              <p v-html="item.name"></p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import Footers from "../../components/Footers.vue";
export default {
  name: "Appraisal",
  data() {
    return {
      navLists: [
        {
          name: "艾森克人格测验<br />（15岁以上）",
          path: "publicIntroduction",
          titles: "艾森克人格测验(15岁以上)",
          details: `本工具是子与时教育机构根据国际范围内心理学领域专业的艾森克人格测试(EysenckPersonality Questionnaire,简称EPQ)开发的自动测评工具本测验适合年龄范围15岁以上，主要测量气质与心理健康水平来评估内外向、稳定性和偏执性，以及社会成熟度，另外通过分数的组合，可以评估气质类型，如多血质、粘液质、胆汁质、抑郁质等。<br /><br/> <p style="text-indent:22px;">本工具中的问题要求你按自己的实际情况回答，不要去猜测怎样才是正确的回答。因为这里不存在正确或错误的回答，也没有捉弄人的问题，将问题的意思看懂了就尽量快速回答，不要花很多时间去想。问卷无时间限制，但不要拖延太长，也不要未看懂问题便回答。<p>`,
          type: "1"
        },
        {
          name: "艾森克人格测验 <br />（15岁以下）",
          path: "publicIntroduction",
          titles: "艾森克人格测验(15岁以下)",
          details: `本工具是子与时教育机构根据国际范围内心理学领域专业的艾森克人格测试(EysenckPersonality Questionnaire,简称EPQ)开发的自动测评工具.本测验适合7- -15岁儿童， 测量儿童青少年的气质与心理健康水平，主要评估内外向、稳定性和偏执性，以及社会成熟度，另外通过分数的组合，可以评估气质类型，如多血质、粘液质、胆汁质、抑郁质等。<br /><br/> <p style="text-indent:22px;">本工具中的问题要求你按自己的实际情况回答，不要去猜测怎样才是正确的回答。因为这里不存在正确或错误的回答，也没有捉弄人的问题，将问题的意思看懂了就尽量快速回答，不要花很多时间去想。问卷无时间限制，但不要拖延太长，也不要未看懂问题便回答。<p>`,
          type: "2"
        },
        {
          name: "霍兰德职业<br />兴趣测验",
          path: "publicIntroduction",
          titles: "霍兰德职业兴趣测验",
          details: `本工具是子与时教育机构根据国际范围内心理学领域专业的霍兰德职业兴趣理论开发的自动测评工具.主要用于确定被测试者的职业兴趣倾向，进而用于指导被测试者选择适合自身职业兴趣的专业发展方向和职业发展方向。霍兰德提出的6种基本职业类型为:实用型R、研究型I、 艺术型A、社会型S、企业型E、常规型C。职业兴趣类型测试题量比较大，测量内容包括职业兴趣类型、职业能力倾向。答案没有好坏、对错之分，不必仔细推敲，结合自己的情况，根据第一印象回答每题.问卷 无时间限制，但不要拖延太长，也不要未看懂问题便回答。`,
          type: "3"
        },
        {
          name: "多元智能测验",
          path: "publicIntroduction",
          titles: "多元智能测验",
          details: `多元智能发展测评系统是子与时教育机构根据国际范围内心理学领域专业评定量表开发的自动测评工具，为学生提供了一种测量智力习性的可能，测试报告仔细地描述了一个人的技能、能力和智力潜能。引导学生更深入地了解他们的学习和生活。元智能理论测评系统的评价不是为了对孩子进行排队，也不仅仅是为了发现小天才，而是旨在发现和了解每个孩子的智能潜力和特点，识别并培养他们区别于他人的智能和兴趣，避免因盲目而扼杀了孩子的优秀天赋和潜能，防止错位方面地去培养孩子，从而帮助他们去实现富有个性特色的发展，为他们提供一条建立自我价值感的有效途径。`,
          type: "4"
        },
        {
          name: "MBTI <br />职业性格测验",
          path: "publicIntroduction",
          titles: "MBTI职业性格测验",
          details: `本工具是构根据荣格的心理类型理论著成，目前已成为国际最为流行的职业人格评估工具。作为一种对个性的判断和分析，是一个理论模型，从纷繁复杂的个性特征中，归纳提炼出4个关键要素一动力、 信息收集、决策方式、生活方式，进行分析判断，从而把不同个性的人区别开来。本问卷中的所有问题都取自于人们的日常生活，您的回答只是表明您通常是如何看待和处理事物的。所有问题都无所谓对错，更无好坏之分，在答题时不必对每道题多加考虑，只要按您的感觉判断进行作答即可。`,
          type: "5"
        }
      ]
    };
  },
  methods: {},
  components: { Footers },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "src/common/css/mixin";
$background: #6eb45c;
.box_cont {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  #test {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: Rem(45);
    @include bgImg("../../assets/test-background.png", cover);
    ul {
      margin-top: Rem(91);
      .test-list {
        margin: Rem(10) auto;
        width: Rem(194);
        height: Rem(70);
        background-color: #fff0c9;
        border-radius: Rem(6);
        a {
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          color: #333;
          .test-list-item {
            font-size: Rem(12);
            text-align: center;
            margin: 0 auto;
            width: Rem(183);
            height: Rem(60);
            line-height: Rem(15);
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            border: Rem(1) dashed #cec2a6;
            border-radius: Rem(9);
            p {
              padding-top: Rem(14);
            }
          }
        }
      }
    }
  }
}
</style>


