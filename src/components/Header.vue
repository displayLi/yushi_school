<template>
  <div class="header_cont">
    <div class="cont_head">
      <img @click="$router.go(-1)" class="fanhui" src="/static/img/fh.png">
      <div class="title">
        {{titleheader}}
        <!-- 更多 -->
        <span class="more" @click="$emit('click')">{{more}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    titleheader: {
      type: String,
      required: true
    },
    more: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "src/common/css/mixin";
$background: #5fb655;
.header_cont {
  width: 100%;
  height: Rem(43);
  background: $background;
  position: fixed;
  top: 0;
  z-index: 1000;
  .cont_head {
    width: Rem(375);
    height: Rem(43);
    margin: 0 auto;
    position: relative;
    img.fanhui {
      width: Rem(7);
      height: Rem(12);
      position: absolute;
      top: Rem(15);
      left: Rem(11);
      z-index: 1;
    }
    .title {
      width: 100%;
      height: Rem(43);
      line-height: Rem(43);
      text-align: center;
      font-size: Rem(15);
      color: #ffffff;
      position: relative;
      .more {
        position: absolute;
        right: Rem(14);
      }
    }
  }
}
</style>
