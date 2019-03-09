<template>
  <button
    id="btnSubmit"
    :disabled="disabled"
    :style="'width:'+width+'px;height:'+height+'px;line-height:'+lineHeight+'px;border-radius:' + radius + 'px;'"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "btnsubmit",
  props: {
    width: String,
    height: String,
    lineHeight: String,
    radius: String,
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "../common/css/_mixin.scss";
#btnSubmit {
  background-color: #6fb35c;
  border: 0;
  font-size: Rem(14);
  color: #fff;
  outline: none;
}
</style>