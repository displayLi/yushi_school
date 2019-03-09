
<template>
  <div id="app" v-if="show">
    <router-view></router-view>
  </div>
</template>

<script>
import PublicJs from "../static/js/public";
import { PaletteButton } from "mint-ui";

window.V = PublicJs;
export default {
  name: "app",
  data() {
    return {
      show: true
    };
  },
  components: {
    "mt-palette-button": PaletteButton
  },
  methods: {
    sub_log(val) {
      console.log("sub_log", val);
      switch (val) {
        case 1:
          this.$router.back();
          break;
        case 2:
          this.$router.push({ path: "/" });
          break;
        case 3:
          const ztData = localStorage.getItem("zt_data");
          if (!ztData) {
            this.$router.push({ path: "/login" });
          } else {
            this.$router.push({ path: "/public_personal_center" });
          }
          break;
        default:
          break;
      }
      this.$refs.target_1.collapse();
    }
  }
};
</script>

<style lang="scss">
@import "src/common/css/reset";
@import "src/common/css/common";

html,
body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.fix-menu {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 999;
  .mint-main-button {
    width: 60px;
    color: rgb(255, 255, 255);
    background-color: rgb(38, 162, 255);
    height: 60px;
    font-size: 25px;
    line-height: 60px;
  }
  .mint-sub-button-container {
    * {
      left: 10px;
      top: 20px;
    }
    .indexicon {
      width: 40px;
      color: rgb(255, 255, 255);
      background-color: rgb(38, 162, 255);
      height: 40px;
      font-size: 12px;
      line-height: 40px;
      border-radius: 20px;
    }
  }
}

select {
  appearance: none;
  -webkit-appearance: none; /*去除chrome浏览器的默认下拉图片*/
  -moz-appearance: none; /*去除Firefox浏览器的默认下拉图片*/
}

/*
* 覆盖mint-ui 样式
* start
*/

.mint-cell {
  background-color: transparent !important;
  box-sizing: border-box;
  padding: 0 Rem(20);
}

.mint-radio-input:checked + .mint-radio-core {
  background-color: #5fb655;
  border-color: #5fb655;
}

.mint-cell-wrapper,
.mint-cell:last-child {
  background-image: none !important;
}

.mint-msgbox-confirm,
.picker-toolbar span {
  color: #6fb35c;
}

#DCdt .mint-radio-input:checked + .mint-radio-core {
  background-color: #ff683e;
  border-color: #ff683e;
}

.mint-loadmore-text {
  font-size: Rem(15);
  color: #ccc;
}
/*
* 覆盖mint-ui 样式
* end
*/

/*
* 覆盖日历的样式
* start
*/
.wh_content_all {
  background-color: rgba(255, 255, 255, 0.8) !important;
}
.wh_top_changge {
  background-color: rgba(253, 128, 34, 0.8);
}
.wh_content_all .wh_content .wh_content_item {
  color: #333;
}

.wh_jiantou1,
.wh_jiantou2 {
  border: 0 !important;
}
.wh_top_changge {
  margin-bottom: Rem(50) !important;
}
.wh_content_item > .wh_isMark {
  background-color: #fd8022 !important;
  color: #fff;
}

.wh_content_item .wh_isToday,
.wh_content_item .wh_chose_day {
  background-color: #5fb655 !important;
  color: #fff !important;
}
.wh_content_item .wh_chose_day {
  background-color: yellowgreen !important;
}
/*
* 覆盖日历的样式
* end
*/
</style>

