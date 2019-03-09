<template>
  <div id="MTL_details">
    <Headers titleheader="曼陀罗" more="我的作品" @click="$router.push('/mywork')"></Headers>
    <!-- 介绍 -->
    <div class="container">
      <p>{{details}}</p>
    </div>
    <!-- 下一步 -->
    <router-link to="/mtl_select" class="submit-container">
      <Submit width="160" height="45" radius="22.5" :disabled="false">下一步</Submit>
    </router-link>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import Submit from "@/components/btnSubmit";
export default {
  name: "mtl_details",
  data() {
    return {
      details:
        "“曼陀罗”是梵语的音译，它的本意是“圆形”或“中心”。它主要以圆形或方形为主，圆形代表宇宙，方形代表地球与人类世界。对着曼陀罗圆形沉思或者给它着色，可以帮助我们和缓释放混乱心灵、排解压力、平衡身心。这些几何图形可以增强我们塑造自己未来的能力，并且加速我们的进步。它唤醒我们在出生前灵魂细部记忆的洞察力，而觉醒的记忆将有助于我们了解今后所需学习的课程，从而使我们的灵魂得到安顿。"
    };
  },
  components: {
    Headers,
    Submit
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#MTL_details {
  position: absolute;
  bottom: 0;
  top: Rem(43);
  width: 100%;
  @include bgImg("../../../assets/beijing.png", cover);
  .container {
    box-sizing: border-box;
    padding: Rem(23) Rem(14);
    p {
      font-size: Rem(12);
      color: white;
      line-height: Rem(24);
      font-weight: 0;
    }
  }
  .submit-container {
    text-align: center;
    position: absolute;
    bottom: Rem(56);
    @include leftCenter(-50%, 0);
  }
}
</style>