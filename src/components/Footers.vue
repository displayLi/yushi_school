<template>
  <div class="footer">
    <!--<mt-tabbar v-model="selected" fixed>-->
    <!--<mt-tab-item v-for="(item,index) in tabs" :id="item.id" :key="index" >-->
    <!--<img slot="icon" :src="item.img_tab">-->
    <!--<span>{{item.name}}</span>-->
    <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <router-link tag="div" to="/ketang" class="footer_li" active-class="active">
      <img v-show="route === '/ketang'" src="../../static/img/kc2.png" alt="">
      <img v-show="route !== '/ketang'" src="../../static/img/kc.png" alt="">
      <div :class="{textact:route === '/ketang'}">课程</div>
      <div :class="{textact1:route !== '/ketang'}">课程</div>
    </router-link>
    <router-link tag="div" to="/fangsong" class="footer_li" active-class="active">
      <img v-show="route === '/fangsong'" src="../../static/img/fs2.png" alt="">
      <img v-show="route !== '/fangsong'" src="../../static/img/fs.png" alt="">
      <div :class="{textact:route === '/fangsong'}">放松区</div>
      <div :class="{textact1:route !== '/fangsong'}">放松区</div>
    </router-link>
    <router-link tag="div" to="/zhuanyeceping" class="footer_li" active-class="active">
      <img v-show="route === '/zhuanyeceping'" src="../../static/img/zycp2.png" alt="">
      <img v-show="route !== '/zhuanyeceping'" src="../../static/img/zycp.png" alt="">
      <div :class="{textact:route === '/zhuanyeceping'}">专业测评</div>
      <div :class="{textact1:route !== '/zhuanyeceping'}">专业测评</div>
    </router-link>
    <router-link tag="div" to="/chengzhang" class="footer_li" active-class="active">
      <img v-show="route === '/chengzhang'" src="../../static/img/czzx2.png" alt="">
      <img v-show="route !== '/chengzhang'" src="../../static/img/czzx.png" alt="">
      <div :class="{textact:route === '/chengzhang'}">成长中心</div>
      <div :class="{textact1:route !== '/chengzhang'}">成长中心</div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    route() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/mixin";
$background: #6EB35C;
$noact:#999999;

.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.footer {
  z-index: 555;
  background-color: #F7F7F7;
  border-top: Rem(1) solid #EEEEEE;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: Rem(49);
  justify-content: space-around;
  text-align: center;
  padding-top: Rem(3);
  box-sizing: border-box;
  line-height: Rem(19);
  .footer_li {
    width: 33%;
    text-align: center;

    div {
      text-align: center;
      font-size: Rem(12);
      font-family: "PingFang-SC-Medium";
      color: $noact;
      margin-top:Rem(2);
    }
    img {
      /*text-align: center;
      display: inline-block;
      width: Rem(25);*/
      height: Rem(19);
      /*display: inline-block;*/
    }
    div.textact{
      color: $background;
    }
    div.textact1{
      color: $noact;
    }
  }
}
</style>
