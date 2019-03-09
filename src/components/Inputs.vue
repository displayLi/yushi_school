<template>
  <div id="inputs">
    <img v-if="imageUrl" :src="getImgUrl" alt="icon">
    <input :type="type" :placeholder="placeholder" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
  name: "inputs",
  props: {
    type: {
      type: String,
      default: "text"
    },
    imageUrl: String,
    placeholder: String
  },
  data() {
    return {};
  },
  computed: {
    getImgUrl() {
      return require(`../assets/${this.imageUrl}.png`);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../common/css/_mixin.scss";
#inputs {
  box-sizing: border-box;
  padding: 0 Rem(18);
  position: relative;
  img {
    display: inline-block;
    height: Rem(19);
    position: absolute;
    top: 0;
    left: Rem(26);
    @include absoluteCenter(0, -50%);
    vertical-align: middle;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    outline: none;
    padding: Rem(14) 0 Rem(14) Rem(28);
    display: block;
    border: Rem(1) solid #eeeeee;
    color: #999999;
    background-color: transparent;
    font-size: Rem(12);
  }
}
</style>