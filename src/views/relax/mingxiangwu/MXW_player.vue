<template>
  <div id="MXW_player">
    <Headers titleheader="冥想屋"></Headers>
    <!-- 播放器 -->
   <div class="play-ctrl">
     <playCtrl :audioUrl="audioUrl"></playCtrl>
   </div>
   <!-- <audio controls autoplay>
        <source :src="audioUrl" type="audio/mp3">
      </audio> -->
  </div>
</template>

<script>
import Headers from "@/components/Header";
import playCtrl from "@/components/playCtrl";
export default {
  name: "mxw_player",
  data() {
    return {
      audioUrl: ""
    };
  },
  created() {
    this.audioUrl = this.$route.params.audioUrl;
  },
  components: {
    Headers,
    playCtrl
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/_mixin.scss";
#MXW_player {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  @include bgImg("../../../assets/mxw-bg.png", cover);
  .play-ctrl {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>