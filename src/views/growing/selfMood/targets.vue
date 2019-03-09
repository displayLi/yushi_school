<template>
  <div id="target">
    <Headers titleheader="学期目标"></Headers>
    <div v-for="(item,index) in targetList" :key="index">
      <NavList :path="'/lookTarget/' + JSON.stringify(item)" :name="item.title" :returns="true"></NavList>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import NavList from "@/components/NavList";
export default {
  name: "target",
  data() {
    return {
      targetList: []
    };
  },
  methods: {
    gotoDetails() {
      alert(11);
    }
  },
  created() {
    this.axios.post("/summary/getTermGoalList").then(res => {
      this.targetList = res;
      console.log(res);
    });
  },
  components: {
    Headers,
    NavList
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#target {
  padding-top: Rem(43);
  background-color: #fff;
}
</style>