<template>
  <div id="postMsg">
    <Headers titleheader="弹个瓶"></Headers>
    <ul class="msgList">
      <li v-for="(item,index) in msgList" :key="index"></li>
    </ul>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "postMsg",
  data() {
    return {
      msgList: []
    };
  },
  components: {
    Headers
  },
  created() {
    console.log(this.$route.params);
    this.axios.post("/interest/renderBottle").then(res => {});
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#postMsg {
  position: absolute;
  top: Rem(43);
  left: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../../assets/my_bottle-bg.png", cover);
}
</style>