<template>
  <div id="problem">
    <Headers titleheader="常见问题"></Headers>
    <iframe width="100%" :height="clientHeight" src="https://api.ziyushi.com/teacher/renderSampleQuestion?token=S0VGTDgzMDk6MTUzNjM3NjU1OTI0MDozOTliYjU2MjgyMGU0YThmMTJjYjgyNDdjMmQwYjNjYQ==" frameborder="0"></iframe>
  </div>
</template>

<script>
import Headers from "@/components/Header";
export default {
  name: "problem",
  data(){
      return {
          clientHeight:window.innerHeight - 43
      }
  },
  components: {
    Headers,
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#problem {
    position: absolute;
    top: Rem(43);
    bottom: 0;
    width: 100%;
    overflow: hidden;
    iframe {
        padding-top:0;
    }
}
</style>