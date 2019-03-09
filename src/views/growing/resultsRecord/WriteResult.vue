<template>
  <div id="WriteResult">
    <Headers titleheader="成绩录入" more="编辑" @click="editCJ"></Headers>
    <ul class="result-list">
      <li v-for="(item,index) in getUserScoreGade" :key="index">
        <label for="index">{{item.subject}}</label>
        <input
          :disabled="isDisabled"
          class="inputs"
          type="text"
          v-model="item.fraction"
          :placeholder="item.subject"
        >
      </li>
      <btnSubmit
        @click="submitCj"
        style="width:100%;"
        :style="isDisabled ? 'background-color:#9c9c9c;' : 'background-color:#6fb35c;'"
        height="40"
        radius="5"
        :disabled="isDisabled"
      >确定</btnSubmit>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
import { Alerts } from "@/common/js/common.js";
export default {
  name: "WriteResult",
  data() {
    return {
      getUserScoreGade: [],
      yearAndyue: [],
      isDisabled: true
    };
  },
  methods: {
    editCJ() {
      this.isDisabled = false;
    },
    submitCj() {
      let { year, month } = this.$route.params;
      const subjectIds = [],
        fractions = [];
      this.getUserScoreGade.forEach(el => {
        subjectIds.push(el.subject_id);
        fractions.push(el.fraction);
      });
      //  储存数据
      this.axios
        .post("/student/gradeEntry", {
          subjectIds: subjectIds.join("-"),
          fractions: fractions.join("-"),
          year,
          month
        })
        .then(res => {
          Alerts("操作成功！");
          this.$router.go(-1);
        });
    }
  },
  created() {
    let { year, month } = this.$route.params;
    let { class_category } = JSON.parse(sessionStorage.userInfo);

    this.axios.post("/student/gradeDetails", { year, month }).then(res => {
      this.getUserScoreGade = res;
      console.log(res);
    });
  },
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#WriteResult {
  width: 100%;
  padding-top: Rem(43);
  background-color: #fff;
  .result-list {
    box-sizing: border-box;
    padding: Rem(13) Rem(25);
    width: 100%;
    li {
      label,
      input {
        font-size: Rem(15);
        color: #666;
        display: inline-block;
        vertical-align: middle;
      }
      input {
        font-size: Rem(12);
        border: Rem(1) solid #eee;
        box-sizing: border-box;
        padding: Rem(12) Rem(14);
        outline: none;
        width: 86%;
      }
    }
  }
}
</style>