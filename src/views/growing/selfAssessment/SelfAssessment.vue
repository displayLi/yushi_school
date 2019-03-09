<template>
  <div id="SelfAssessment">
    <Headers titleheader="自我评价"></Headers>
    <ul>
        <li v-for="(item,index) in assessmentDate" :key="index">
            <NavList 
                :path="`/assessment?date=${item}&title=${item.replace('-','年') + '月'}`" 
                :name="item.replace('-','年') + '月'" 
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
  name: "Reports",
  data() {
    return {
     assessmentDate:[]
    };
  },
  methods: {
    
  },
  created() {
   this.axios.post('/interest/getEvaluateDateList')
        .then(res => {
            this.assessmentDate = res;
        })
  },
  components: {
    Headers,
    NavList,
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#SelfAssessment {
    padding-top: Rem(43);
  background-color: #fff;
}

</style>