<template>
  <router-link :to="path" id="NavList" @click="$emit('click')">
    <span class="nav-icon" v-if="imageUrl">
      <img :src="getImgUrl" alt>
    </span>
    <span class="names">{{name}}</span>
    <span class="returns" v-if="returns">
      <svg
        t="1550482500354"
        class="icon"
        style
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2252"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="200"
        height="200"
      >
        <path
          d="M320 230.8 361.4 192 704 512 361.4 832 320 793.4 621 512Z"
          p-id="2253"
          fill="#dbdbdb"
        ></path>
      </svg>
    </span>
  </router-link>
</template>

<script>
export default {
  name: "navList",
  props: {
    path: String,
    imageUrl: String,
    name: {
      type: String,
      required: true
    },
    returns: Boolean
  },
  data() {
    return {};
  },
  computed: {
    getImgUrl() {
      if (this.imageUrl) {
        return require(`../assets/${this.imageUrl}.png`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../common/css/_mixin.scss";
#NavList {
  display: block;
  box-sizing: border-box;
  margin-left: Rem(13);
  line-height: Rem(43);
  border-bottom: Rem(1) solid #eee;
  position: relative;
  .nav-icon {
    display: inline-block;
    width: Rem(21);
    height: Rem(21);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      vertical-align: middle;
    }
  }
  .names {
    font-size: Rem(14);
    vertical-align: middle;
  }
  .returns {
    position: absolute;
    top: 0;
    right: Rem(5);
    height: Rem(45);
    width: Rem(20);
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>