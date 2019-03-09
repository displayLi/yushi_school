<template>
  <div id="swiper" v-if="imgItemList.length > 0">
    <div class="close" @click="$emit('click')">
      <svg
        t="1550309391445"
        class="icon"
        style
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1104"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="200"
        height="200"
      >
        <path
          d="M500.738817 865.647506 500.738817 824.337984 500.738817 865.647506Z"
          p-id="1105"
          fill="#ffffff"
        ></path>
        <path
          d="M542.525088 518.634593l457.97127-457.983391c10.100622-10.100622 10.100622-26.477769 0-36.578391-10.100622-10.100622-26.452518-10.100622-36.553139 0L505.953768 482.062263 47.975427 24.073821c-10.100622-10.07638-26.477769-10.100622-36.553139 0-10.100622 10.100622-10.100622 26.477769-0.024241 36.578391l457.983391 457.983391L11.398046 976.617984c-10.07638 10.102642-10.07638 26.478779 0.024241 36.579401 10.07638 10.07739 26.452518 10.07739 36.553139 0l457.978341-457.989452L963.94322 1013.197385c10.07739 10.07739 26.452518 10.07739 36.553139 0 10.100622-10.100622 10.100622-26.476759 0-36.579401L542.525088 518.634593z"
          p-id="1106"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <mt-swipe
      :show-indicators="false"
      :auto="0"
      :continuous="continuous"
      :defaultIndex="swiperIndex"
    >
      <mt-swipe-item v-for="(item,index) in imgItemList" :key="index">
        <img :src="item" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";

export default {
  name: "swiper",
  props: {
    imgItemList: {
      // 图片资源数组
      type: Array,
      required: true
    },
    swiperIndex: Number, // 所要显示图片的index
    continuous: {
      // 是否启用循环
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/_mixin.scss";
#swiper {
  position: fixed;
  top: Rem(43);
  bottom: 0;
  width: 100%;
  background-color: #000;
  .close {
    font-size: 0;
    position: absolute;
    top: Rem(15);
    left: Rem(15);
    width: Rem(20);
    height: Rem(20);
    z-index: 1;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  img {
    width: 100%;
    object-fit: contain;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>