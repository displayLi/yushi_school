<template>
  <div id="mywork">
    <Headers titleheader="我的作品"></Headers>
    <!-- nav -->
    <ul>
      <li
        v-for="(item,index) in workList"
        :key="index"
        @click="$router.push({name:'lookmywork',params:item})"
      >
        <img :src="item.img" alt>
      </li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "mywork",
  data() {
    return {
      workList: []
    };
  },
  components: {
    Headers
  },
  methods: {
    myWork() {
      this.axios("/interest/getManZuoPinList").then(res => {
        this.workList = res;
      });
    }
  },
  created() {
    this.myWork();
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#mywork {
  padding-top: Rem(43);
  ul {
    background-color: #fff;
    box-sizing: border-box;
    padding: Rem(6);
    li {
      display: inline-block;
      margin-right: Rem(2);
      border: Rem(1) solid #eee;
      width: Rem(115);
      height: Rem(115);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>