<template>
  <div id="lookTarget">
    <Headers titleheader="学期目标" more="发送" @click="post"></Headers>
    <textarea placeholder="请输入学期目标" v-model="targetTails.context"></textarea>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import { Alerts } from "@/common/js/common";
export default {
  name: "lookTarget",
  data() {
    return {
      targetTails: {}
    };
  },
  methods: {
    post() {
      if (this.targetTails.context) {
        this.axios
          .post("/summary/updateTermGoal", {
            title: this.targetTails.title,
            context: this.targetTails.context
          })
          .then(res => this.$router.go(-1));
      } else {
        Alerts("请填写内容后在进行发送！");
      }
    }
  },
  created() {
    this.targetTails = JSON.parse(this.$route.params.query);
  },
  components: {
    Headers
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#lookTarget {
  padding-top: Rem(43);
  background-color: #fff;
  textarea {
    box-sizing: border-box;
    padding: Rem(10) Rem(15);
    border: 0;
    height: Rem(150);
    width: 100%;
    outline: none;
    font-size: Rem(15);
  }
}
</style>