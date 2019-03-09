<template>
  <div id="assessment">
    <Headers :titleheader="routerDate"></Headers>
    <ul>
      <li v-for="(item,index) in explainList" :key="index">
        <h6>
          <span class="icon"></span>
          <span>{{item.content}}</span>
        </h6>
        <div class="start">
          <Star
            :readOnly="isPublish == 1"
            :starNum="5"
            :defaultRating="item.answer"
            @starMarkChange="starMarkChange($event,item.content,index)"
          ></Star>
        </div>
        <p>{{item.explain}}</p>
      </li>
    </ul>
    <div class="btnSubmit" v-if="!isPublish">
      <btnSubmit style="width:100%;" height="45" @click="saveSubmit" :disabled="false">提交</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import Star from "@/components/Star";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "assessment",
  data() {
    return {
      routerDate: "",
      explainList: [],
      saveAssessment: [],
      isPublish: 0
    };
  },
  methods: {
    starMarkChange(val, content, index) {
      this.saveAssessment[index] = {
        answer: val,
        content
      };
    },
    saveSubmit() {
      console.log(this.saveAssessment);
      this.axios
        .post("/interest/saveEvaluateAnswer", {
          date: this.$route.query.date,
          answer: this.saveAssessment
        })
        .then(res => {
          if (!res) Alerts("操作成功!");
        });
    }
  },
  created() {
    let { title, date } = this.$route.query;

    this.routerDate = title;
    this.axios.post("/interest/getEvaluateAnswer", { date }).then(res => {
      this.explainList = res.list;
      this.isPublish = res.isPublish;

      this.explainList.forEach(el => {
        this.saveAssessment.push({
          answer: el.answer,
          content: el.explain
        });
      });
    });
  },
  components: {
    Headers,
    Star,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#assessment {
  padding-top: Rem(43);
  background-color: #fff;
  ul {
    box-sizing: border-box;
    padding: 0 Rem(10) Rem(15);
    li {
      position: relative;
      h6 {
        display: inline-block;
        font-size: Rem(15);
        color: #333;
        .icon {
          display: inline-block;
          width: Rem(5);
          height: Rem(16);
          background-color: #5fb655;
        }
        span {
          vertical-align: middle;
        }
      }
      div {
        position: absolute;
        top: 30%;
        right: 0;
        width: 78%;
        display: inline-block;
        div {
          display: inline-block;
          text-align: center;
        }
      }
      p {
        margin-left: Rem(10);
        font-size: Rem(12);
        color: #999;
        padding-top: Rem(6);
      }
    }
  }
  .btnSubmit {
    box-sizing: border-box;
    padding: 0 Rem(20) Rem(16);
  }
}
</style>