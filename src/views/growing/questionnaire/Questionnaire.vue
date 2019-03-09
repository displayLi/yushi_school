<template>
  <div id="questionnaire">
    <Headers titleheader="问卷调查"></Headers>
    <div class="content">
      <p>本次调查只为了了解学生整体状态，因此采用不记名方式，请你仔细阅读每道题的内容，并根据自己的情况认真填写。在 问卷题目中涉及评分的我均已满分为10分的标准进行评价。</p>
      <btnSubmit
        style="width:100%"
        height="45"
        radius="5"
        :disabled="false"
        @click="$router.push('/questionnaireAnswer')"
      >开始</btnSubmit>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import btnSubmit from "@/components/btnSubmit";
export default {
  name: "questionnaire",
  components: {
    Headers,
    btnSubmit
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#questionnaire {
  position: absolute;
  top: Rem(43);
  bottom: 0;
  background-color: #fff;
  .content {
    box-sizing: border-box;
    padding: Rem(36) Rem(19);
    p {
      line-height: Rem(24);
      color: #333;
      font-size: Rem(15);
    }
    button {
      margin-top: Rem(54);
      background-color: #ff683e;
    }
  }
}
</style>