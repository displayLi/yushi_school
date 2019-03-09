<template>
  <div class="box_cont">
    <div id="Relax-container">
      <p class="warrings">放松区介绍：在这里，找到适合你的方式，排解你的压力，找到你的兴趣，促进你的成长</p>
      <ul class="nav-container">
        <li v-for="(item,index) in navLists" :key="index">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import Footers from "../../components/Footers.vue";
export default {
  name: "Relax",
  data() {
    return {
      navLists: [
        { name: "曼陀罗", path: "/mtl_details" },
        { name: "冥想屋", path: "/mxw_list" },
        { name: "弹个瓶", path: "/tgp_default" }
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
  #Relax-container {
    position: absolute;
    @include bgImg("../../assets/beijing.png", cover);
    width: 100%;
    top: 0;
    left: 0;
    bottom: Rem(48);
    .warrings {
      box-sizing: border-box;
      padding: Rem(15) Rem(15) Rem(19) Rem(17.5);
      font-size: Rem(12);
      line-height: 22px;
      color: white;
      font-weight: 400;
    }
    .nav-container {
      text-align: center;
      li {
        width: Rem(100);
        line-height: Rem(100);
        margin: 0 auto;
        border: Rem(3) solid #fff;
        background-color: #fac801;
        border-radius: 50%;
        margin-bottom: Rem(22.5);
        a {
          font-size: Rem(16);
          color: black;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

