<template>
  <div id="MonthlyGoals">
    <Headers titleheader="月目标月总结"></Headers>
    <ul>
      <li v-for="(item,index) in MonthlyGoals" :key="index">
        <NavList
          v-for="(data,flag) in item.data"
          :key="flag"
          :path="`/goals?year=${item.year}&mouth=${data.mouth}&data=${JSON.stringify(data)}`"
          :name="item.year +'-'+ data.mouth"
          :returns="true"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import NavList from "@/components/NavList";
import getDate, { Alerts } from "@/common/js/common.js";
export default {
  name: "MonthlyGoals",
  data() {
    return {
      MonthlyGoals: []
    };
  },
  methods: {},
  created() {
    this.axios("/summary/getUserGoalsList").then(res => {
      this.MonthlyGoals = res;
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
#MonthlyGoals {
  padding-top: Rem(43);
  background-color: #fff;
}
</style>